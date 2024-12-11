import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import BaseUrl from "@/lib";
import ButtonImage from "@/components/ButtonImage";
import InputText from "@/components/InputText";
import ButtonBlue from "@/components/ButtonBlue";
import { router } from "expo-router";

const FormData = global.FormData;

const CreateBarang: React.FC = () => {
  const [nama_barang, setNama_barang] = useState("");
  const [merk, setMerk] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [stok, setStok] = useState("");
  const [gambar, setGambar] = useState("");

  const [msg, setMsg] = useState("");

  const pickImage = async () => {
    Alert.alert(
      "Pilih Gambar",
      "Pilih sumber gambar",
      [
        {
          text: "Galeri",
          onPress: async () => {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled && result.assets) {
              saveImage(result.assets[0].uri);
            }
          },
        },
        {
          text: "Kamera",
          onPress: async () => {
            await ImagePicker.requestCameraPermissionsAsync();
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled && result.assets) {
              saveImage(result.assets[0].uri);
            }
          },
        },
        { text: "Batal", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const saveImage = async (imageUri: string) => {
    try {
      setGambar(imageUri);
    } catch (error: any) {
      console.error("Error saving image:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        setMsg("Auth token is missing.");
        return;
      }

      const formData = new FormData();
      formData.append("nama_barang", nama_barang);
      formData.append("merk", merk);
      formData.append("lokasi", lokasi);
      formData.append("stok", stok);

      if (gambar) {
        formData.append("gambar", {
          uri: gambar,
          type: "image/png",
          name: "gambar-barang.png",
        } as any);
      }

      const response = await axios.post(`${BaseUrl}/barang`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      ToastAndroid.show("Data berhasil dibuat!", ToastAndroid.SHORT);
      console.log("Success:", response.data);
    } catch (error: any) {
      console.error("Request error:", error);
      setMsg("Terjadi kesalahan. Silakan coba lagi.");
    }finally{
      router.push('/(admin)/barang')
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
                  gambar
                    ? { uri: gambar }
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
            text="Nama Barang"
            value={nama_barang}
            placeholder="Masukan Nama Barang"
            keyboard="default"
            onChange={(value: any) => setNama_barang(value)}
          />

          <InputText
            text="Stok"
            value={stok}
            placeholder="Masukan Stok"
            keyboard="number-pad"
            onChange={(value: any) => setStok(value)}
          />

          <InputText
            text="Lokasi"
            value={lokasi}
            placeholder="Masukan Lokasi"
            keyboard="default"
            onChange={(value: any) => setLokasi(value)}
          />

          <InputText
            text="Merk"
            value={merk}
            placeholder="Masukan Merk"
            keyboard="default"
            onChange={(value: any) => setMerk(value)}
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
