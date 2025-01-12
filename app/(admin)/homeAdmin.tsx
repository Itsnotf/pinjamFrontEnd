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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const HomeAdmin = () => {
  const router = useRouter();

  const handleBarang = () => {
    router.push("/(admin)/barang");
  };

  const handleKontak = () => {
    router.push("/(admin)/kontak");
  };

  const handleKatagori = () => {
    router.push("/(admin)/katagori");
  };

  const handleSaran = () => {
    router.push("/(admin)/saran");
  };

  const handlePeminjaman = () => {
    router.push("/(admin)/peminjaman");
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userID");
      await AsyncStorage.removeItem("RoleID");
      router.replace("/sign-in");
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

        <TouchableOpacity
          onPress={handleBarang}
          className="w-full my-3 justify-center px-4"
        >
          <View className="bg-abu h-[150px] flex flex-row rounded-xl px-4">
            <View className="w-[45%] justify-center items-start">
              <View className="w-[90%] h-[90%] items-center justify-center rounded-lg">
                <MaterialIcons name="inventory" color="#013FC4" size={62} />
              </View>
            </View>

            <View className="w-[55%] justify-center gap-2">
              <Text className="text-2xl text-secondary font-semibold">
                List Barang
              </Text>
              <Text className="text-abuabu text-sm">
                Anda dapat memanejemen Barang disini
              </Text>
              <Text className="text-secondary font-semibold">Barang</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleKontak}
          className="w-full my-3 justify-center px-4"
        >
          <View className="bg-abu h-[150px] flex flex-row rounded-xl px-4">
            <View className="w-[45%] justify-center items-start">
              <View className="w-[90%] h-[90%] items-center justify-center rounded-lg">
              <MaterialIcons name="contact-phone" color="#013FC4" size={50} />
              </View>
            </View>

            <View className="w-[55%] justify-center gap-2">
              <Text className="text-2xl text-secondary font-semibold">
                List Kontak
              </Text>
              <Text className="text-abuabu text-sm">
                Anda dapat memanejemen Kontak disini
              </Text>
              <Text className="text-secondary font-semibold">Kontak</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSaran}
          className="w-full my-3 justify-center px-4"
        >
          <View className="bg-abu h-[150px] flex flex-row rounded-xl px-4">
            <View className="w-[45%] justify-center items-start">
              <View className="w-[90%] h-[90%] items-center justify-center rounded-lg">
              <MaterialIcons name="mail" color="#013FC4" size={62} />
              </View>
            </View>

            <View className="w-[55%] justify-center gap-2">
              <Text className="text-2xl text-secondary font-semibold">
                List Saran
              </Text>
              <Text className="text-abuabu text-sm">
                Anda dapat memanejemen Saran disini
              </Text>
              <Text className="text-secondary font-semibold">Saran</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePeminjaman}
          className="w-full my-3 justify-center px-4"
        >
          <View className="bg-abu h-[150px] flex flex-row rounded-xl px-4">
            <View className="w-[45%] justify-center items-start">
              <View className="w-[90%] h-[90%] items-center justify-center rounded-lg">
              <Ionicons name="bag-handle-sharp" color="#013FC4" size={62} />
              </View>
            </View>

            <View className="w-[55%] justify-center gap-2">
              <Text className="text-2xl text-secondary font-semibold">
                List Peminjaman
              </Text>
              <Text className="text-abuabu text-sm">
                Anda dapat memanejemen Peminjaman disini
              </Text>
              <Text className="text-secondary font-semibold">Peminjaman</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleKatagori}
          className="w-full my-3 justify-center px-4"
        >
          <View className="bg-abu h-[150px] flex flex-row rounded-xl px-4">
            <View className="w-[45%] justify-center items-start">
              <View className="w-[90%] h-[90%] items-center justify-center rounded-lg">
              <Ionicons name="bag-handle-sharp" color="#013FC4" size={62} />
              </View>
            </View>

            <View className="w-[55%] justify-center gap-2">
              <Text className="text-2xl text-secondary font-semibold">
                List katagori
              </Text>
              <Text className="text-abuabu text-sm">
                Anda dapat memanejemen katagori disini
              </Text>
              <Text className="text-secondary font-semibold">katagori</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeAdmin;
