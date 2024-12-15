import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import BaseUrl, { GambarUrl } from "@/lib";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import InputTextEdit from "@/components/InputTextEdit";
import Feather from "@expo/vector-icons/Feather";
import ButtonImage from "@/components/ButtonImage";
import ButtonWhite from "@/components/ButtonWhite";
import ButtonBlue from "@/components/ButtonBlue";
import ButtonDelete from "@/components/ButtonDelete";
import ButtonEdit from "@/components/ButtonEdit";

const DetailBarang: React.FC = () => {
  const [nama_barang, setNama_barang] = useState("");
  const [merk, setMerk] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [stok, setStok] = useState("");
  const [gambar, setGambar] = useState("");
  const [gambarBaru, setGambarBaru] = useState("");
  const [msg, setMsg] = useState("");
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useLocalSearchParams();

  const handleEdit = () => {
    setEdit(true);
  };
  const handleBatal = () => {
    setEdit(false);
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        setMsg("Auth token is missing.");
        setIsLoading(false);
        return;
      }

      const res = await axios.get(`${BaseUrl}/barang/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data;
      setNama_barang(data.nama_barang);
      setLokasi(data.lokasi);
      setMerk(data.merk);
      setStok(data.stok);
      setGambar(data.gambar);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setMsg("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const pickImage = async () => {
    Alert.alert("Pilih Gambar", "Pilih sumber gambar", [
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
            setGambarBaru(result.assets[0].uri);
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
            setGambarBaru(result.assets[0].uri);
          }
        },
      },
      { text: "Batal", style: "cancel" },
    ]);
  };

  const submitData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
  
      if (!token) {
        setMsg("Auth token is missing.");
        setIsLoading(false);
        return;
      }
  
      const formData = new FormData();
      formData.append("nama_barang", nama_barang);
      formData.append("merk", merk);
      formData.append("lokasi", lokasi);
      formData.append("stok", stok);
      formData.append("_method", "PUT");
  
      if (gambarBaru) {
        formData.append("gambar", {
          uri: gambarBaru,
          type: "image/png",
          name: "gambar-barang.png",
        } as any);
      }
  
      const response = await axios.post(`${BaseUrl}/barang/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (!response.data.status) {
        setMsg(response.data.message);
        console.log(response.data.data);
      } else {
        ToastAndroid.show("Data berhasil diperbarui!", ToastAndroid.SHORT);
        setEdit(false);
      }
    } catch (error) {
      console.error("Request error:", error);
      setMsg("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setEdit(false);
      setIsLoading(false);
    }
  };
  
  const handleSubmit = () => {
    Alert.alert(
      "Konfirmasi",
      "Anda yakin ingin memperbarui barang berikut?",
      [
        { text: "Batal", style: "cancel" },
        { text: "Ya", onPress: submitData },
      ]
    );
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        setMsg("Auth token is missing.");
        setIsLoading(false);
        return;
      }

      const response = await axios.delete(`${BaseUrl}/barang/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.status) {
        setMsg(response.data.message);
        console.log(response.data.data);
      } else {
        ToastAndroid.show("Data berhasil dihapus!", ToastAndroid.SHORT);
      }
    } catch (error: any) {
      console.error("Request error:", error);
      ToastAndroid.show("Data Gagal Di Hapus", ToastAndroid.SHORT);
    } finally {
      router.push("/(admin)/barang");
    }
  };

  return (
    <KeyboardAvoidingView
      className="bg-primary"
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={{ flex: 1 }}
    >
      <ScrollView className="bg-white rounded-t-3xl mt-4">
        <View className="mx-4">
          {isLoading ? (
            <View className="flex-1 items-center justify-center  h-[80vh]">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <>
              <View
                className={`flex flex-row my-2 items-start ${
                  edit ? " justify-center" : "justify-between"
                }`}
              >
                {edit ? <></> : <ButtonDelete handle={handleDelete} />}

                <View className="relative w-56 h-56 rounded-full">
                  <Image
                    style={{
                      borderRadius: 9999,
                      width: "100%",
                      height: "100%",
                    }}
                    source={
                      gambarBaru
                        ? { uri: gambarBaru }
                        : gambar
                        ? {
                            uri: `${GambarUrl}/${gambar}`,
                          }
                        : require("../../../assets/images/adaptive-icon.png")
                    }
                    resizeMode="cover"
                  />
                  {edit && (
                    <View className="absolute bottom-0 right-3 ">
                      <ButtonImage handler={pickImage} />
                    </View>
                  )}
                </View>
                {edit ? <></> : <ButtonEdit handle={handleEdit} />}
              </View>

              <View className="mb-4">
                <InputTextEdit
                  onChange={(value: any) => setNama_barang(value)}
                  edit={edit}
                  placeholder="Masukan Nama Barang"
                  text="Barang"
                  value={nama_barang}
                  keyboard="default"
                />

                <InputTextEdit
                  onChange={(value: any) => setStok(value)}
                  edit={edit}
                  placeholder="Masukan Stok"
                  text="Stok"
                  value={stok}
                  keyboard="number-pad"
                />

                <InputTextEdit
                  onChange={(value: any) => setLokasi(value)}
                  edit={edit}
                  placeholder="Masukan Lokasi"
                  text="Lokasi"
                  value={lokasi}
                  keyboard="default"
                />

                <InputTextEdit
                  onChange={(value: any) => setMerk(value)}
                  edit={edit}
                  placeholder="Masukan Merk"
                  text="Merk"
                  value={merk}
                  keyboard="default"
                />
              </View>

              <View className="flex-row gap-2">
                {edit ? (
                  <>
                    <View className="w-[50%] py-1">
                      <ButtonBlue handle={handleSubmit} text="Submit" />
                    </View>
                    <View className="w-[50%] py-1">
                      <ButtonWhite text="Batal" handle={handleBatal} />
                    </View>
                  </>
                ) : (
                  <></>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DetailBarang;
