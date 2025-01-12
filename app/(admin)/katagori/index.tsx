import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import BaseUrl from "@/lib";
import { Link, router } from "expo-router";

interface Katagori {
  id: number;
  nama: string;
  desk: string;
}

const Katagori = () => {
  const [katagori, setKatagori] = useState<Katagori[]>([]); // Menggunakan tipe data Barang
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        console.log("Token tidak ditemukan");
        return;
      }

      const response = await fetch(`${BaseUrl}/katagori`, {
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
        setKatagori(responseData.data);
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

  const handlePress = (id: number) => {
    router.push(`/katagori/${id}`);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView
        className="mx-4"
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {loading ? (
          <View className="flex-1 items-center justify-center  h-[80vh]">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : katagori.length === 0 ? (
          <View className="w-full h-[70vh]  items-center justify-center">
            <Text className="text-white text-sm">Belum Ada Katagori</Text>
          </View>
        ) : (
          katagori.map((katagori) => (
            <TouchableOpacity
              onPress={() => handlePress(katagori.id)}
              key={katagori.id}
            >
              <View className="bg-white p-4 my-2 rounded-lg ">
                <Text className="text-xl font-bold ">{katagori.nama}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Katagori;
