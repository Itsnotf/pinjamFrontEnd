import {
  View,
  Text,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import BaseUrl, { getToken, userID } from "@/lib";
import axios from "axios";
import CardPeminjaman from "@/components/CardPeminjaman";

const PeminjamanUser = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const token = await getToken();

    const UserId = await userID();

    if (!token) {
      ToastAndroid.show("Token tidak ditemukan", ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/peminjaman`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Data fetch failed");
      }
      const responseData = response.data;
      if (responseData.status && Array.isArray(responseData.data)) {
        const filteredData = responseData.data.filter(
          (item: any) => item.id_user === Number(UserId)
        );
      
        const sortedData = filteredData.sort((a : any, b : any) => {
          if (a.status === "Belum Dikembalikan" && b.status !== "Belum Dikembalikan") {
            return -1; // a sebelum b
          } else if (a.status !== "Belum Dikembalikan" && b.status === "Belum Dikembalikan") {
            return 1; // b sebelum a
          } else {
            return 0; // posisi tidak berubah
          }
        });
      
        setData(sortedData);
      } else {
        console.error(
          "Response data tidak berbentuk array atau gagal mendapatkan data"
        );
        ToastAndroid.show("Data tidak valid", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      ToastAndroid.show("Error fetching data", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView className="h-full bg-gray-100">
      <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
        {loading ? (
          <View className="flex-1 items-center justify-center  h-[80vh]">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : data.length === 0 ? (
          <View className="w-full h-[70vh]  items-center justify-center">
          <Text className="text-secondary text-sm">Belum Ada Peminjaman</Text>
        </View>
        ) : (
          data.map((peminjaman) => (
            <CardPeminjaman
              key={peminjaman.id}
              link={`peminjamanUser/${peminjaman.id}`}
              borrowerName={peminjaman.users.name}
              itemName={peminjaman.barang.nama_barang}
              quantity={peminjaman.jumlah}
              status={peminjaman.status}
              image={peminjaman.barang.gambar}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PeminjamanUser;
