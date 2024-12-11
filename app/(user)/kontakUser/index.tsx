import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import BaseUrl from "@/lib";
import CardKontakUser from "@/components/CardKontakUser";

// Interface untuk tipe data Kontak
interface Kontak {
  id: number;
  nama_staf: string;
  badge: string;
  nohp: string;
  gambar: string;
  created_at: string;
  updated_at: string;
}

const KontakUser = () => {
  const [dataKontak, setDataKontak] = useState<Kontak[]>([]); // Menggunakan tipe data Kontak
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        console.log("Token tidak ditemukan");
        return;
      }

      const response = await fetch(`${BaseUrl}/kontak`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Data fetch failed");
      }
      const responseData = await response.json();
      if (responseData.status && Array.isArray(responseData.data)) {
        setDataKontak(responseData.data);
      } else {
        console.error("Data tidak berbentuk array atau gagal mendapatkan data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
        {loading ? (
          <View className="flex-1 items-center justify-center  h-[80vh]">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : dataKontak.length === 0 ? (
          <View className="w-full h-[70vh]  items-center justify-center">
            <Text className="text-secondary text-sm">Belum Ada Kontak</Text>
          </View>
        ) : (
          dataKontak.map((kontak) => (
            <CardKontakUser
              key={kontak.id}
              noHp={kontak.nohp}
              nama={kontak.nama_staf}
              image={kontak.gambar}
              badge={kontak.badge}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default KontakUser;
