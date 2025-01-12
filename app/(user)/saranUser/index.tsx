import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseUrl, { userID } from "@/lib";
import ButtonBlue from "@/components/ButtonBlue";

const SaranUser = () => {
  const [saran, setSaran] = useState("");

  const handleKirimSaran = async () => {
    if (!saran) {
      Alert.alert("Peringatan", "Deskripsi saran tidak boleh kosong");
      return;
    }

    try {
      const UserID = await userID();
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(`${BaseUrl}/saran`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_user: UserID,
          deskripsi: saran,
        }),
      });

      if (response.ok) {
        ToastAndroid.show("Saran Berhasil Dikirim", ToastAndroid.SHORT);
        setSaran("");
      } else {
        ToastAndroid.show("Saran Gagal Dikirim", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Terjadi kesalahan saat mengirim saran");
    }
  };
  return (
    <SafeAreaView className="h-full bg-gray-100">
      <ScrollView
        className="mx-4"
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <View className="bg-white p-4 rounded-lg shadow-md">
          <Text className="text-2xl font-semibold text-gray-800 mb-4 ">
            Beri Saran Anda
          </Text>

          <TextInput
            className=" rounded-lg  text-gray-700 h-40"
            placeholder="Tulis saran Anda di sini..."
            multiline
            value={saran}
            onChangeText={setSaran}
            style={{ textAlignVertical: "top" }}
          />
        </View>
        <View className="mt-6"> 
          <ButtonBlue text="Kirim" handle={handleKirimSaran} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SaranUser;
