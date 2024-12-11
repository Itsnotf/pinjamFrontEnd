import BaseUrl, { getToken } from "@/lib";
import axios from "axios";
import { Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import CardSaran from "@/components/CardSaran";

interface Saran {
  id: number;
  id_user: number;
  deskripsi: string;
  date: string;
  created_at: string;
  updated_at: string;
  users: User;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const Saran = () => {
  const [data, setData] = useState<Saran[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const token = await getToken();

    if (!token) {
      ToastAndroid.show("Token tidak ditemukan", ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/saran`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Data fetch failed");
      }

      const responseData = response.data;
      if (responseData.status && Array.isArray(responseData.data)) {
        setData(responseData.data);
      } else {
        console.error("Data tidak berbentuk array atau gagal mendapatkan data");
        ToastAndroid.show("Data tidak valid", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      ToastAndroid.show("Error fetching data", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
        {loading ? (
          <View className="flex-1 items-center justify-center  h-[80vh]">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : data.length === 0 ? (
          <View className="w-full h-[70vh]  items-center justify-center">
            <Text className="text-white text-sm">Belum Ada Saran</Text>
          </View>
        ) : (
          data.map((saran) => {
            return (
              <CardSaran
                key={saran.id}
                name={saran.users.name}
                suggestion={saran.deskripsi}
                date={saran.date}
              />
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Saran;
