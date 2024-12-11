import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import  { GambarUrl } from "@/lib";
import { Href, useRouter } from "expo-router";

interface CardKontakProps {
  link: Href;
  nama: string;
  badge: string;
  noHp: string;
  image: string;
}

const CardKontak: React.FC<CardKontakProps> = ({link, nama, badge, noHp,  image}) => {

  const router = useRouter();

  const handleLink = (link: Href) => {
    router.push(link);
  };

  return (
    <TouchableOpacity
      onPress={() => handleLink(link)}
      className="mx-4 mt-4 shadow-lg flex flex-row bg-white rounded-xl overflow-hidden"
    >
      <View className="w-[50%] h-[120px]">
        <Image
        className="w-full object-cover h-full"
          source={{uri: `${GambarUrl}/${image}`}}
        />
      </View>
      <View className="w-1/2 p-4 justify-center">
        <Text className="text-lg font-bold text-gray-800 mb-1">{nama}</Text>
        <Text className="text-gray-600 text-sm mb-2" numberOfLines={2}>
          {badge}
        </Text>
        <Text className="text-gray-500 font-semibold">{noHp}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardKontak;
