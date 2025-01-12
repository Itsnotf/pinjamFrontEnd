import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import BaseUrl, { GambarUrl, getToken, userID } from "@/lib";
import ButtonBlue from "@/components/ButtonBlue";
import ButtonWhite from "@/components/ButtonWhite";

const DetailBarangUser: React.FC = () => {
  const [nama_barang, setNama_barang] = useState("");
  const [merk, setMerk] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [stok, setStok] = useState("");
  const [katagori, setKatagori] = useState("");
  const [serial, setSerial] = useState("");
  const [gambar, setGambar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jumlah, setJumlah] = useState("");

  const { id } = useLocalSearchParams();

  const getData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        ToastAndroid.show("Token Tidak Ditemukan", ToastAndroid.SHORT);
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
      setSerial(data.serial_number);
      setMerk(data.merk);
      setStok(data.stok);
      setGambar(data.gambar);
      setKatagori(data.katagori.nama);
      
    } catch (error) {
      console.error("Failed to fetch data:", error);
      ToastAndroid.show("Gagal Tolong Coba Lagi", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePinjam = () => {
    setIsModalVisible(true);
  };

  const handleConfirmPinjam = async () => {
    if (parseInt(jumlah) > parseInt(stok)) {
      ToastAndroid.show("Jumlah barang tidak tersedia", ToastAndroid.SHORT);
      return;
    }

    try {
      const token = await getToken();
      const UserID = await userID();

      if (!token) {
        ToastAndroid.show("Token tidak ditemukan", ToastAndroid.SHORT);
        return;
      }
      
      const data = {
        id_barang: id,
        jumlah: jumlah,
        id_user: UserID,
      };

      const res = await axios.post(`${BaseUrl}/peminjaman`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.data.status == false) {
        ToastAndroid.show("Peminjaman Gagal", ToastAndroid.SHORT);
        console.log(res.data);
      } else {
        ToastAndroid.show("Peminjaman Berhasil", ToastAndroid.SHORT);
        router.push("/homeUser");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error details:", {
          response: error.response ? error.response.data : null,
          status: error.response ? error.response.status : null,
        });
      } else {
        console.log("Unexpected error:", error);
      }
      ToastAndroid.show("Terjadi kesalahan", ToastAndroid.SHORT);
    } finally {
      setIsModalVisible(false);
      setJumlah("");
    }
  };

  return (
    <KeyboardAvoidingView
      className="mt-10"
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View className="mx-4">
          {isLoading ? (
            <View className="flex-1 items-center justify-center  h-[80vh]">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <View className="w-full bg-white p-6 rounded-lg shadow-lg">
              <Text className="text-xl font-semibold text-gray-800 mb-4">
                Detail Barang
              </Text>

              <View className="flex items-center my-2">
                <View className="relative w-full h-56 rounded-full">
                  <Image
                    style={{
                      borderRadius: 20,
                      width: "100%",
                      height: "100%",
                    }}
                    source={
                      gambar
                        ? {
                            uri: `${GambarUrl}/${gambar}`,
                          }
                        : require("../../../assets/images/adaptive-icon.png")
                    }
                    resizeMode="cover"
                  />
                </View>
              </View>

              <View className="mb-3">
                <Text className="text-gray-600 font-semibold">Nama Barang</Text>
                <Text className="text-base text-gray-800">{nama_barang}</Text>
              </View>

              <View className="mb-3">
                <Text className="text-gray-600 font-semibold">Katagori Barang</Text>
                <Text className="text-base text-gray-800">{katagori}</Text>
              </View>

              <View className="mb-3">
                <Text className="text-gray-600 font-semibold">Stok</Text>
                <Text className="text-base text-gray-800">{stok}</Text>
              </View>

              <View className="mb-3">
                <Text className="text-gray-600 font-semibold">Serial</Text>
                <Text className="text-base text-gray-800">{serial}</Text>
              </View>

              <View className="mb-3">
                <Text className="text-gray-600 font-semibold">Lokasi</Text>
                <Text className="text-base text-gray-800">{lokasi}</Text>
              </View>

              <View className="mb-3">
                <Text className="text-gray-600 font-semibold">Merk</Text>
                <Text className="text-base text-gray-800">{merk}</Text>
              </View>

              <ButtonBlue text="Pinjam" handle={handlePinjam} />

              <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <View className="w-full bg-white p-5 h-[] rounded-lg">
                    <Text className="text-secondary font-semibold">Jumlah</Text>
                    <TextInput
                      value={jumlah}
                      onChangeText={(text) => {
                        if (parseInt(text) <= parseInt(stok) || text === "") {
                          setJumlah(text);
                        } else {
                          ToastAndroid.show(
                            "Jumlah melebih stok yang tersedia",
                            ToastAndroid.SHORT
                          );
                        }
                      }}
                      keyboardType="numeric"
                      maxLength={stok.length}
                      className="border p-2  rounded-lg my-5"
                      placeholder="Masukkan jumlah"
                    />

                    <View className="flex-col gap-2">
                      <ButtonBlue
                        text="Konfirmasi Pinjaman"
                        handle={handleConfirmPinjam}
                      />
                      <ButtonWhite
                        handle={() => setIsModalVisible(false)}
                        text="Batal"
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DetailBarangUser;
