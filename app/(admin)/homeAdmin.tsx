import CardFitur from "@/components/CardFitur";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const HomeAdmin = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userID");
      await AsyncStorage.removeItem("RoleID");
      router.replace("/sign-in");
      console.log("Token Berhasil Di hapus");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <ScrollView>
        <View className="relative  h-[30vh] bg-primary justify-end gap-2 px-5 py-10 ">
          <Text className="text-white text-4xl font-bold">
            Selamat Datang, Admin
          </Text>
          <Text className="text-gray-300 text-lg w-4/6">
            Ada banyak yang harus di monitoring hari ini
          </Text>
          <TouchableOpacity
            className="p-2 rounded-lg absolute top-14 right-5 bg-secondary  w-[35px] h-[35px]"
            onPress={handleLogout}
          >
            <SimpleLineIcons name="logout" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <View className="mx-4 py-4 border-secondary">
          <Text className="text-2xl text-secondary font-medium">
            Main Fitur
          </Text>
        </View>

        <CardFitur
          jumlah=""
          title="Barang"
          desk="Anda dapat memanejemen Kontak disini"
          link="/barang"
        />
        <CardFitur
          jumlah=""
          title="Kontak"
          desk="Kontak barang di aplikasi ini "
          link="/kontak"
        />
        <CardFitur
        jumlah=""
          title="Saran"
          desk="Lihat saran yang telah diberikan"
          link="/saran"
        />
        <CardFitur
        jumlah=""
          title="Peminjaman"
          desk="Lihat peminjaman yang telah terjadi"
          link="/peminjaman"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeAdmin;
