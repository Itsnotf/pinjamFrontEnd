import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import useImagePicker from "@/hooks/useImagePicker";
import ButtonImage from "@/components/ButtonImage";
import BaseUrl, { getToken } from "@/lib";
import { router } from "expo-router";
import InputText from "@/components/InputText";
import ButtonBlue from "@/components/ButtonBlue";

const CreateBarang: React.FC = () => {
  const [nama_staff, setNama_staff] = useState("");
  const [badge, setBadge] = useState("");
  const [nohp, setNohp] = useState("");
  const { selectedImage, pickImage } = useImagePicker();

  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    try {
      const token = await getToken();

      if (!token) {
        setMsg("Auth token is missing.");
        return;
      }

      const formData = new FormData();
      formData.append("nama_staf", nama_staff);
      formData.append("badge", badge);
      formData.append("nohp", nohp);
      if (selectedImage) {
        formData.append("gambar", {
          uri: selectedImage,
          type: "image/png",
          name: "gambar-kontak.png",
        } as any);
      }

      const response = await axios.post(`${BaseUrl}/kontak`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        ToastAndroid.show('Data Berhasil Di Buat',ToastAndroid.SHORT)
        router.push('/(admin)/kontak')
      } else {
        setMsg(`Failed to create data: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error("Request error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan. Silakan coba lagi.";
      console.log(errorMessage);
    }
  };

  return (
    <View className="bg-primary">
    <ScrollView className="bg-white mt-5 h-full rounded-t-3xl">
      <View className="mx-4 mt-2">
        <View className="flex items-center">
          <View className="relative w-56 h-56 bg-abu rounded-full mb-6">
            <Image
              style={{
                borderRadius: 9999,
                width: "100%",
                height: "100%",
              }}
              source={
                selectedImage
                  ? { uri: selectedImage }
                  : require("../../../assets/images/adaptive-icon.png")
              }
              resizeMode="cover"
            />
            <View className="absolute bottom-0 right-3">
              <ButtonImage handler={pickImage} />
            </View>
          </View>
        </View>

        <InputText
          text="Nama Staff"
          value={nama_staff}
          placeholder="Masukan Nama Staff"
          keyboard="default"
          onChange={(value: any) => setNama_staff(value)}
        />

        <InputText
          text="Badge"
          value={badge}
          placeholder="Masukan Badge"
          keyboard="default"
          onChange={(value: any) => setBadge(value)}
        />

        <InputText
          text="No HP"
          value={nohp}
          placeholder="Masukan No HP"
          keyboard="number-pad"
          onChange={(value: any) => setNohp(value)}
        />

        <View className="my-10">
          <ButtonBlue text="Submit" handle={handleSubmit} />
        </View>

        {msg && (
          <Text className="text-red-500 text-center mt-4 text-sm">{msg}</Text>
        )}
      </View>
    </ScrollView>
  </View>
  );
};

export default CreateBarang;