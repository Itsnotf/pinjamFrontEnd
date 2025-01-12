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
import InputTextEdit from "@/components/InputTextEdit";
import ButtonImage from "@/components/ButtonImage";
import ButtonWhite from "@/components/ButtonWhite";
import ButtonBlue from "@/components/ButtonBlue";
import ButtonDelete from "@/components/ButtonDelete";
import ButtonEdit from "@/components/ButtonEdit";

const DetailBarang: React.FC = () => {
  const [nama, setNama] = useState("");
  const [desk, setDesk] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);

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

      const res = await axios.get(`${BaseUrl}/katagori/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data;
      setNama(data.nama);
      setDesk(data.desk);
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
      formData.append("nama", nama);
      formData.append("desk", desk);
      formData.append("_method", "PUT");
  
      const response = await axios.post(`${BaseUrl}/katagori/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (!response.data.status) {
        setMsg(response.data.message);
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

      const response = await axios.delete(`${BaseUrl}/katagori/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.status) {
        setMsg(response.data.message);
      } else {
        ToastAndroid.show("Data berhasil dihapus!", ToastAndroid.SHORT);
      }
    } catch (error: any) {
      console.error("Request error:", error);
      ToastAndroid.show("Data Gagal Di Hapus", ToastAndroid.SHORT);
    } finally {
      router.push("/(admin)/katagori");
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
                {edit ? <></> : <ButtonEdit handle={handleEdit} />}
              </View>

              <View className="mb-4">
                <InputTextEdit
                  onChange={(value: any) => setNama(value)}
                  edit={edit}
                  placeholder="Masukan Nama "
                  text="Nama"
                  value={nama}
                  keyboard="default"
                />

                <InputTextEdit
                  onChange={(value: any) => setDesk(value)}
                  edit={edit}
                  placeholder="Masukan deskripsi"
                  text="Desk"
                  value={desk}
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
