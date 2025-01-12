import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  Alert,
  ScrollView,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import BaseUrl from "@/lib";
import ButtonImage from "@/components/ButtonImage";
import InputText from "@/components/InputText";
import ButtonBlue from "@/components/ButtonBlue";

const FormData = global.FormData;

const CreateBarang: React.FC = () => {
  const [nama, setNama] = useState("");
  const [desk, setDesk] = useState("");
  const [msg, setMsg] = useState("");


  const validateFields = () => {
    if (!nama) return "Nama";
    if (!desk) return "Deskripsi";
    return null;
  };

  const handleSubmit = async () => {
    const emptyField = validateFields();

    if(emptyField) {
      ToastAndroid.show(`Data ${emptyField} Belum Terisi` , ToastAndroid.SHORT);
      return;
    }

    Alert.alert(
      "Konfirmasi",
      "Apakah data sudah benar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("authToken");
              if (!token) {
                setMsg("Auth token is missing.");
                return;
              }

              const formData = new FormData();
              formData.append("nama", nama);
              formData.append("desk", desk);

              const response = await axios.post(`${BaseUrl}/katagori`, formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              });

              ToastAndroid.show("Data berhasil dibuat!", ToastAndroid.SHORT);

              router.push("/(admin)/katagori");
            } catch (error: any) {
              console.error("Request error:", error);
              setMsg("Terjadi kesalahan. Silakan coba lagi.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className="bg-primary">
      <ScrollView className="bg-white mt-5 h-full rounded-t-3xl">
        <View className="mx-4 mt-2">
      

          <InputText
            text="Nama Katagori"
            value={nama}
            placeholder="Masukan Nama"
            keyboard="default"
            onChange={(value: any) => setNama(value)}
          />

          <InputText
            text="Deskripsi"
            value={desk}
            placeholder="Masukan Desk"
            keyboard="default"
            onChange={(value: any) => setDesk(value)}
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
