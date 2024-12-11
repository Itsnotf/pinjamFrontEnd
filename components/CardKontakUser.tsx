import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import BaseUrl, { GambarUrl } from "@/lib";
import { Href, router } from "expo-router";

interface CardKontakUserProps {

  nama: string;
  badge: string;
  noHp: string;
  image: string;
}

const CardKontakUser: React.FC<CardKontakUserProps> = ({
  // link,
  nama,
  badge,
  noHp,
  image,
}) => {
  
  const makePhoneCall = (phoneNumber : any) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Nomor telepon tidak dapat dibuka");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <TouchableOpacity
      onPress={() => makePhoneCall(noHp)}
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

export default CardKontakUser;
