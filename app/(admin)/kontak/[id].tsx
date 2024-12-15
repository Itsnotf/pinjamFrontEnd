import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useImagePicker from "@/hooks/useImagePicker";
import BaseUrl, { GambarUrl, getToken } from "@/lib";
import axios from "axios";
import ButtonImage from "@/components/ButtonImage";
import InputText from "@/components/InputText";
import InputTextEdit from "@/components/InputTextEdit";
import ButtonDelete from "@/components/ButtonDelete";
import ButtonEdit from "@/components/ButtonEdit";
import ButtonBlue from "@/components/ButtonBlue";
import ButtonWhite from "@/components/ButtonWhite";

const DetailKontak = () => {
  const [nama_staf, setNama_staf] = useState("");
  const [badge, setBadge] = useState("");
  const [hp, setHp] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [gambar, setGambar] = useState(null);
  const { selectedImage, pickImage } = useImagePicker();

  const { id } = useLocalSearchParams();

  const getData = async () => {
    const token = await getToken();

    if (!token) {
      ToastAndroid.show("Token Tidak Ditemukan", ToastAndroid.SHORT);
    }

    try {
      const res = await axios.get(`${BaseUrl}/kontak/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      

      if (res.status != 200) {
        ToastAndroid.show("Data Gagal Di Load", ToastAndroid.SHORT);
      }
      setNama_staf(res.data.data.nama_staf);
      setBadge(res.data.data.badge);
      setGambar(res.data.data.gambar);
      setHp(res.data.data.nohp);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBatal = () => {
    setIsEditing(false);
  };

  const sendSubmit = async () => {
    try {
      const token = await getToken();
      if (!token) {
        ToastAndroid.show("Token Tidak Ditemukan", ToastAndroid.SHORT);
        return; // Exit if no token is found
      }

      const formData = new FormData();
      formData.append("nama_staf", nama_staf);
      formData.append("badge", badge);
      formData.append("hp", hp);
      formData.append("_method", "PUT");

      if (selectedImage) {
        formData.append("gambar", {
          uri: selectedImage,
          type: "image/jpeg", // Adjust this type if needed (e.g., image/png)
          name: "gambar-kontak.jpeg",
        } as any);
      }

      const res = await axios.post(`${BaseUrl}/kontak/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 200) {
        console.log("Error in response", res);
      } else {
        console.log("Success", res.data);
      }
    } catch (error: any) {
      console.log("Error caught:", error);
    } finally {
      ToastAndroid.show("Data Berhasil Di Update", ToastAndroid.CENTER);
      setIsEditing(false);
    }
  };

  const handleSubmit = () => {
      Alert.alert(
        "Konfirmasi",
        "Anda yakin ingin memperbarui Kontak berikut?",
        [
          { text: "Batal", style: "cancel" },
          { text: "Ya", onPress: sendSubmit },
        ]
      );
    };

  const handleDelete = async () => {
    try {
      const token = await getToken();

      if (!token) {
        ToastAndroid.show("Token Tidak Ditemukan", ToastAndroid.SHORT);
        return;
      }

      const res = await axios.delete(`${BaseUrl}/kontak/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        ToastAndroid.show(res.statusText, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Data Berhasil Di Hapus", ToastAndroid.SHORT);
        router.push("/(admin)/kontak");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View className=" bg-primary h-full">
      <ScrollView className="bg-white h-full rounded-t-3xl">
        <View className="px-4 py-6">
          <View
            className={`items-start flex flex-row ${
              isEditing ? "justify-center" : "justify-between"
            }`}
          >
            {isEditing ? <></> : <ButtonDelete handle={handleDelete} />}
            <View className="relative w-56 h-56 bg-black rounded-full mb-6">
              <Image
                className="object-cover rounded-full w-full h-full"
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : gambar
                    ? { uri: `${GambarUrl}/${gambar}` }
                    : require("../../../assets/images/adaptive-icon.png")
                }
              />
              {isEditing && (
                <View className="absolute bottom-0 right-3 border rounded-full">
                  <ButtonImage handler={pickImage} />
                </View>
              )}
            </View>
            {isEditing ? <></> : <ButtonEdit handle={handleEdit} />}
          </View>
          <InputTextEdit
            edit={isEditing}
            keyboard="default"
            onChange={(value: any) => setNama_staf(value)}
            placeholder="Masukan Nama Staff"
            text="Nama Staff"
            value={nama_staf}
          />
          <InputTextEdit
            keyboard="default"
            onChange={(value: any) => setBadge(value)}
            placeholder="Masukan Badge"
            text="Badge"
            value={badge}
            edit={isEditing}
          />

          <InputTextEdit
            edit={isEditing}
            keyboard="number-pad"
            onChange={(value: any) => setHp(value)}
            placeholder="Masukan Hp"
            text="Hp"
            value={hp}
          />

          <View className="w-full flex flex-row justify-around mt-6">
            {isEditing ? (
              <View className="flex flex-row w-full gap-2">
                <View className="w-[50%]">
                  <ButtonBlue handle={handleSubmit} text="Submit" />
                </View>
                <View className="w-[50%]">
                  <ButtonWhite handle={handleBatal} text="Batal" />
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailKontak;
