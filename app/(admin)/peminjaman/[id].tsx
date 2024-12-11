import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Importing icons for a modern look
import BaseUrl, { GambarUrl, getToken } from "@/lib";
import axios from "axios";

interface Barang {
  id: number;
  nama_barang: string;
  merk: string;
  stok: string;
  lokasi: string;
  gambar: string | null;
  created_at: string;
  updated_at: string;
}

interface Users {
  id: number;
  name: string;
  email: string;
  id_role: number;
  created_at: string;
  updated_at: string;
  email_verified_at: string;
}

interface PeminjamanDetail {
  id: number;
  id_user: number;
  id_barang: number;
  jumlah: string;
  status: string;
  tgl_peminjaman: string;
  tgl_pengembalian: string | null;
  gambar: string | null;
  created_at: string;
  updated_at: string;
  barang: Barang;
  users: Users;
}

const DetailPeminjaman = () => {
  const [namaPeminjam, setNamaPeminjam] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [gambar, setGambar] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [tgl_peminjaman, setTgl_peminjaman] = useState("");
  const [tgl_pengembalian, setTgl_pengembalian] = useState("");
  const [badge, setBadge] = useState("");


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
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          <Text className="text-gray-600 font-semibold">Badge Peminjam</Text>
          <Text className="text-base text-gray-800">{badge}</Text>
        </View>

        <View className="mb-3">
          <Text className="text-gray-600 font-semibold">Nama Barang</Text>
          <Text className="text-base text-gray-800">{namaBarang}</Text>
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
    </View>
  );
};

export default DetailPeminjaman;
