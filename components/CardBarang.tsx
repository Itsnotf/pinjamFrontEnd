import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Href, useRouter } from "expo-router";
import { GambarUrl } from "@/lib";

interface CardBarangProps {
  nama: string;
  desk: string;
  link: Href;
  quan: string;
  gambar: any; 
}

const CardBarang: React.FC<CardBarangProps> = ({ link, nama, desk, quan, gambar }) => {
  const router = useRouter();

  const handleLink = (link: Href) => {
    router.push(link);
  };

  return (
    <TouchableOpacity
      onPress={() => handleLink(link)}
      className="mt-4 h-32 shadow-lg flex flex-row bg-white rounded-xl overflow-hidden"
    >
      <View className="w-[50%] h-full">
        <Image
          source={{ uri: `${GambarUrl}/${gambar}` }} 
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
      <View className="w-1/2 p-4 justify-center">
        <Text className="text-lg font-bold text-gray-800 mb-1">{nama}</Text>
        <Text className="text-gray-600 text-sm mb-2" numberOfLines={2}>
         Merk: {desk}
        </Text>

        <Text className="text-gray-500 font-semibold">
          Quantity: <Text className="text-gray-800">{quan}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardBarang;
