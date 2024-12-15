import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Href, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

interface CardFiturProps {
  title: string;
  desk: string;
  jumlah: string;
  link: Href;
}

const CardFitur: React.FC<CardFiturProps> = ({ title, desk, jumlah, link }) => {
  const router = useRouter();

  const handleLink = () => {
    router.push(link);
  };

  return (
    <TouchableOpacity
      onPress={handleLink}
      className="w-full my-3 justify-center px-4"
    >
      <View className="bg-abu h-[150px] flex flex-row rounded-xl px-4">
        <View className="w-[45%] justify-center items-start">
          <View className="w-[90%] h-[90%] items-center justify-center rounded-lg">
            <MaterialIcons name="inventory" color="#000" size={62} />
            {/* <Image
              className="rounded-lg"
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "cover",
              }}
              source={require("../assets/images/react-logo.png")}
            /> */}
          </View>
        </View>

        <View className="w-[55%] justify-center gap-2">
          <Text className="text-2xl text-secondary font-semibold">
            List {title}
          </Text>
          <Text className="text-abuabu text-sm">{desk}</Text>
          <Text className="text-secondary font-semibold">
            {title} {jumlah}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardFitur;
