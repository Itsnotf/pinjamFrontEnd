import CardBarang from "@/components/CardBarang";
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

// Interface untuk tipe data Barang
interface Barang {
  id: number;
  nama_barang: string;
  merk: string;
  stok: string;
  serial: string;
  gambar: string;
  lokasi: string;
  created_at: string;
  updated_at: string;
}

const BarangUser = () => {
  const [dataBarang, setDataBarang] = useState<Barang[]>([]); // Menggunakan tipe data Barang
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        console.log("Token tidak ditemukan");
        return;
      }

      const response = await fetch(`${BaseUrl}/barang`, {
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
        setDataBarang(responseData.data);
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

  console.log(dataBarang);
  
  return (
    <SafeAreaView className="h-full">
      <ScrollView
        className="mx-4"
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {loading ? (
          <View className="flex-1 items-center justify-center  h-[80vh]">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : dataBarang.length === 0 ? (
          <View className="w-full h-[70vh]  items-center justify-center">
            <Text className="text-secondary text-sm">Belum Ada Barang</Text>
          </View>
        ) : (
          dataBarang.map((barang) => (
            <CardBarang
              key={barang.id}
              link={`/barangUser/${barang.id}`}
              nama={barang.nama_barang}
              desk={barang.merk}
              quan={barang.stok}
              gambar={barang.gambar}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BarangUser;
