import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BaseUrl, { GambarUrl, getToken } from "@/lib";
import axios from "axios";
import useImagePicker from "@/hooks/useImagePicker";
import ButtonBlue from "@/components/ButtonBlue";
import ButtonWhite from "@/components/ButtonWhite";

const DetailPeminjamanUser = () => {
  const [namaPeminjam, setNamaPeminjam] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [gambar, setGambar] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [badge, setBadge] = useState("");
  const [tgl_peminjaman, setTgl_peminjaman] = useState("");
  const [tgl_pengembalian, setTgl_pengembalian] = useState("");
  const { selectedImage, pickImage } = useImagePicker();
  const [modalVisible, setModalVisible] = useState(false);

  const { id } = useLocalSearchParams();

  const getData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        ToastAndroid.show("Token Tidak Ditemukan", ToastAndroid.SHORT);
        return;
      }

      const res = await axios.get(`${BaseUrl}/peminjaman/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        throw new Error("Data fetch failed");
      }

      const fetchedData = res.data.data;
      setNamaPeminjam(fetchedData.users.name);
      setBadge(fetchedData.users.badge);
      setNamaBarang(fetchedData.barang.nama_barang);
      setJumlah(fetchedData.jumlah);
      setGambar(fetchedData.gambar);
      setStatus(fetchedData.status);
      setTgl_peminjaman(fetchedData.tgl_peminjaman);
      setTgl_pengembalian(fetchedData.tgl_pengembalian);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const HandlePengembalian = async () => {
    try {
      const token = await getToken();

      if (!token) {
        ToastAndroid.show("Token Tidak Ditemukan", ToastAndroid.SHORT);
        return; // Stop further execution if token is not found
      }

      if (!selectedImage) {
        ToastAndroid.show("Pilih Gambar Terlebih Dahulu", ToastAndroid.SHORT);
      }

      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("gambar", {
        uri: selectedImage,
        type: "image/jpeg",
        name: "gambar.jpg", // Add file extension for better compatibility
      } as any);

      console.log(formData);

      const res = await axios.post(`${BaseUrl}/peminjaman/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        router.push("/peminjamanUser");
        ToastAndroid.show("Barang Berhasil Dikembalikan", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Barang Gagal Dikembalikan", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Error:", error);
      ToastAndroid.show(
        "Terjadi Kesalahan Saat Pengembalian",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View className="flex-1 items-center px-4 py-6 bg-gray-100">
      {status !== "Belum Dikembalikan" && (
        <View className="relative w-full h-56 bg-gray-200 rounded-lg overflow-hidden mb-6">
          <Image
            source={
              gambar
                ? { uri: `${GambarUrl}/${gambar}` }
                : require("../../../assets/images/adaptive-icon.png")
            }
            className="w-full h-full"
            style={{ resizeMode: "cover" }}
          />
        </View>
      )}

      <View className="w-full bg-white p-6 rounded-lg shadow-lg">
        <Text className="text-xl font-semibold text-gray-800 mb-4">
          Detail Peminjaman
        </Text>

        <View className="mb-3">
          <Text className="text-gray-600 font-semibold">Status Peminjaman</Text>
          <Text
            className="text-base font-bold"
            style={{ color: status === "Belum Dikembalikan" ? "red" : "green" }}
          >
            {status}
          </Text>
        </View>

        <View className="mb-3">
          <Text className="text-gray-600 font-semibold">Nama Peminjam</Text>
          <Text className="text-base text-gray-800">{namaPeminjam}</Text>
        </View>

        <View className="mb-3">
          <Text className="text-gray-600 font-semibold">Nama Barang</Text>
          <Text className="text-base text-gray-800">{namaBarang}</Text>
        </View>

        <View className="mb-3">
          <Text className="text-gray-600 font-semibold">Badge Peminjam</Text>
          <Text className="text-base text-gray-800">{badge}</Text>
        </View>

        <View className="mb-3">
          <Text className="text-gray-600 font-semibold">Jumlah Barang</Text>
          <Text className="text-base text-gray-800">{jumlah}</Text>
        </View>

        <View className="mb-3">
          <Text className="text-gray-600 font-semibold">
            Tanggal Peminjaman
          </Text>
          <Text className="text-base text-gray-800">{tgl_peminjaman}</Text>
        </View>

        {status !== "Belum Dikembalikan" && (
          <View className="mb-3">
            <Text className="text-gray-600 font-semibold">
              Tanggal Pengembalian
            </Text>
            <Text className="text-base text-gray-800">{tgl_pengembalian}</Text>
          </View>
        )}
      </View>

      {status == "Belum Dikembalikan" && (
        <View className="w-full my-6">
          <ButtonBlue
          handle={() => setModalVisible(true)}
          text="Kembalikan"
          />
        </View>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          <View className="bg-white p-6 rounded-lg w-full">
            <Text className="text-lg font-bold mb-4 text-secondary">
              Kirim Foto Kondisi Barang
            </Text>

            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                className="w-full h-56 rounded-lg mb-4"
                style={{ resizeMode: "cover" }}
              />
            )}

            <TouchableOpacity
              onPress={pickImage}
              className="flex-row items-center justify-center bg-gray-200 p-4 rounded-lg mb-4"
            >
              <Ionicons name="camera" size={24} color="black" />
              <Text className="ml-2 text-lg font-medium">Ambil Foto</Text>
            </TouchableOpacity>

            <View className="flex-row gap-2 justify-between mt-4">
              <View className="w-[50%]">
                <ButtonBlue handle={HandlePengembalian} text="Konfirmasi" />
              </View>

              <View className="w-[50%]">
                <ButtonWhite
                  handle={() => setModalVisible(false)}
                  text="Batal"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailPeminjamanUser;
