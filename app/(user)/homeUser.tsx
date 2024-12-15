import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CardBarang from "@/components/CardBarang";
import axios from "axios";
import BaseUrl, { getToken } from "@/lib";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";

interface Barang {
  id: number;
  nama_barang: string;
  merk: string;
  stok: string;
  gambar: string;
  lokasi: string;
  created_at: string;
  updated_at: string;
}

const HomeUser = () => {
  const [barang, setBarang] = useState<Barang[]>([]);

  const getData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        ToastAndroid.show("Token Tidak Ditemukan", ToastAndroid.SHORT);
        return;
      }

      const res = await axios.get(`${BaseUrl}/barang`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBarang(res.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userID");
      await AsyncStorage.removeItem("RoleID");
      router.replace("/sign-in");
      console.log("Token dan User Berhasil Di hapus");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View className="bg-primary">
      <View className="w-full  my-10 items-start justify-end">
        <View className="absolute top-5 right-3">
          <TouchableOpacity
            className="p-2 mx-5 w-10 h-10 rounded bg-secondary"
            onPress={handleLogout}
          >
            <SimpleLineIcons name="logout" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <View className="mx-4 mt-10">
          <Text className="text-2xl text-white font-semibold">
            Selamat Datang
          </Text>
          <Text className="mr-20 text-white">
            Anda dapat melakukan peminjaman melalui aplikasi ini
          </Text>
        </View>
      </View>

      <View className="bg-white h-full rounded-t-xl">
        <View className="mx-4">
          <View className="mt-2">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 5 }}
            >
              <View className="w-full h-fit py-2 flex flex-row items-start gap-5">
                <TouchableOpacity
                  onPress={() => router.push("/barangUser")}
                  className="w-20 items-center"
                >
                  <View className="w-14 h-14 bg-primary rounded-lg justify-center items-center">
                    <AntDesign name="inbox" size={24} color="white" />
                  </View>
                  <Text className="text-secondary">Barang</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/peminjamanUser")}
                  className="w-20 items-center"
                >
                  <View className="w-14 h-14 bg-primary items-center justify-center rounded-lg">
                    <MaterialIcons name="history" size={24} color="white" />
                  </View>
                  <Text className="text-secondary">History</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/kontakUser")}
                  className="w-20 items-center"
                >
                  <View className="w-14 h-14 bg-primary items-center justify-center rounded-lg">
                    <AntDesign name="contacts" size={24} color="white" />
                  </View>
                  <Text className="text-secondary">Kontak</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/saranUser")}
                  className="w-20 items-center"
                >
                  <View className="w-14 h-14 bg-primary items-center justify-center rounded-lg">
                    <Entypo name="chat" size={24} color="white" />
                  </View>
                  <Text className="text-secondary">Saran</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          <View className="mt-10">
            <View className=" flex flex-row justify-between">
              <Text className="text-secondary font-medium text-lg">
                List Barang
              </Text>
              <Link href="/barangUser">
                <Text className="text-secondary">Semua</Text>
              </Link>
            </View>

            {barang.slice(0, 3).map((barang) => (
              <CardBarang
                desk={barang.merk}
                gambar={barang.gambar}
                nama={barang.nama_barang}
                quan={barang.stok}
                link={`barangUser/${barang.id}`}
                key={barang.id}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeUser;
