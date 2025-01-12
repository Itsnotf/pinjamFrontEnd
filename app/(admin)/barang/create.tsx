import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  Alert,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import BaseUrl from "@/lib";
import ButtonImage from "@/components/ButtonImage";
import InputText from "@/components/InputText";
import ButtonBlue from "@/components/ButtonBlue";
import SelectInput from "@/components/SelectInput";

const FormData = global.FormData;

interface Katagori {
  id: number;
  nama: string;
  desk: string;
}

const CreateBarang: React.FC = () => {
  const [nama_barang, setNama_barang] = useState("");
  const [merk, setMerk] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [stok, setStok] = useState("");
  const [serial, setSerial] = useState("");
  const [katagoriId, setKatagoriId] = useState<number | null>(null);
  const [gambar, setGambar] = useState("");
  const [katagori, setKatagori] = useState<Katagori[]>([]);

  const pickImage = async () => {
    Alert.alert(
      "Pilih Gambar",
      "Pilih sumber gambar",
      [
        {
          text: "Galeri",
          onPress: async () => {
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

  const saveImage = (imageUri: string) => {
    setGambar(imageUri);
  };

  const validateFields = () => {
    if (!nama_barang) return "Nama Barang";
    if (!stok) return "Stok";
    if (!lokasi) return "Lokasi";
    if (!merk) return "Merk";
    if (!gambar) return "Gambar";
    if (!katagoriId) return "Kategori";
    return null;
  };

  const handleSubmit = async () => {
    const emptyField = validateFields();

    if (emptyField) {
      ToastAndroid.show(`Data ${emptyField} Belum Terisi`, ToastAndroid.SHORT);
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
                ToastAndroid.show("Token tidak ditemukan.", ToastAndroid.SHORT);
                return;
              }

              const formData = new FormData();
              formData.append("nama_barang", nama_barang);
              if (katagoriId !== null) {
                formData.append("katagori_id", katagoriId.toString());
              }              
              formData.append("merk", merk);
              formData.append("lokasi", lokasi);
              formData.append("stok", stok);
              formData.append("serial_number", serial);
              if (gambar) {
                formData.append("gambar", {
                  uri: gambar,
                  type: "image/png",
                  name: "gambar-barang.png",
                } as any);
              }

              await axios.post(`${BaseUrl}/barang`, formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              });

              ToastAndroid.show("Data berhasil dibuat!", ToastAndroid.SHORT);
              router.push("/(admin)/barang");
            } catch (error) {
              console.error("Request error:", error);
              ToastAndroid.show(
                "Terjadi kesalahan. Silakan coba lagi.",
                ToastAndroid.SHORT
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("Token tidak ditemukan");
        return;
      }

      const response = await axios.get(`${BaseUrl}/katagori`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setKatagori(response.data.data);
    } catch (error) {
      console.error("Error fetching kategori:", error);
      ToastAndroid.show(
        "Gagal memuat kategori. Coba lagi nanti.",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

          <SelectInput
            label="Kategori"
            options={katagori.map((item) => ({
              label: item.nama,
              value: item.id,
            }))}
            onSelect={(value) => setKatagoriId(value)}
          />

          <InputText
            text="Nama Barang"
            value={nama_barang}
            placeholder="Masukan Nama Barang"
            keyboard="default"
            onChange={setNama_barang}
          />

          <InputText
            text="Stok"
            value={stok}
            placeholder="Masukan Stok"
            keyboard="number-pad"
            onChange={setStok}
          />

          <InputText
            text="Serial"
            value={serial}
            placeholder="Masukan Serial"
            keyboard="number-pad"
            onChange={setSerial}
          />

          <InputText
            text="Lokasi"
            value={lokasi}
            placeholder="Masukan Lokasi"
            keyboard="default"
            onChange={setLokasi}
          />

          <InputText
            text="Merk"
            value={merk}
            placeholder="Masukan Merk"
            keyboard="default"
            onChange={setMerk}
          />

          <View className="my-10">
            <ButtonBlue text="Submit" handle={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateBarang;
