import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { Href, useRouter } from "expo-router";
import BaseUrl, { GambarUrl } from "@/lib";

interface CardPeminjamanProps {
  link: any;
  itemName: string;
  borrowerName: string;
  quantity: number;
  status: string;
  image: ImageSourcePropType;
}

const CardPeminjaman: React.FC<CardPeminjamanProps> = ({
  link,
  itemName,
  borrowerName,
  quantity,
  status,
  image,
}) => {
  const router = useRouter();

  const handleLink = () => {
    router.push(link);
  };

  return (
    <TouchableOpacity
      onPress={handleLink}
      className="mx-4 mt-4 shadow-lg flex flex-row bg-white rounded-xl overflow-hidden"
    >
      <View className="w-[50%] h-[150px]">
        <Image
          source={
            image
              ? { uri: `${GambarUrl}/${image}` }
              : require("../assets/images/adaptive-icon.png")
          }
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
      <View className="w-1/2 p-4 justify-center">
        <Text className="text-lg font-bold text-gray-800 mb-1">{itemName}</Text>
        <Text className="text-gray-600 text-sm mb-2" numberOfLines={2}>
          {borrowerName}
        </Text>
        <Text className="text-gray-500 text-sm">Jumlah: {quantity}</Text>
        <Text className="text-gray-500 text-sm">{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardPeminjaman;
