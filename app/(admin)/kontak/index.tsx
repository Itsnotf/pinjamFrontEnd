import BaseUrl, { GambarUrl, getToken } from "@/lib";
import CardKontak from "@/components/CardKontak";
import {
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

interface Kontak {
  id: number;
  nama_staf: string;
  badge: string;
  nohp: string;
  gambar: any;
  created_at: string;
  updated_at: string;
}

const Kontak = () => {
  const [data, setData] = useState<Kontak[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const token = await getToken();

    if (!token) {
      ToastAndroid.show("Token tidak ditemukan", ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/kontak`, {
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
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  
  
  // console.log(data[0].id);
  
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
        {loading ? (
          <View className='flex-1 items-center justify-center  h-[70vh]'>
          <ActivityIndicator size="large" color="white" />
        </View>
        ) : data.length === 0 ? (
          <View className="w-full h-[70vh]  items-center justify-center">
            <Text className="text-white text-sm">Belum Ada Kontak</Text>
          </View>
        ) : (
          data.map((kontak) => (
            <CardKontak
            key={kontak.id}
            link={`/kontak/${kontak.id}`}
            nama={kontak.nama_staf}
            badge={kontak.badge}
            noHp={kontak.nohp}
            image={kontak.gambar}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Kontak;
