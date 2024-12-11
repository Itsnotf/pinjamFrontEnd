import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CardSaranProps {
  name: string;
  suggestion: string;
  date: string;
}

const CardSaran: React.FC<CardSaranProps> = ({ name, suggestion, date }) => {
  return (
    <View className="mx-4 mt-4 shadow-lg flex flex-row bg-white rounded-xl overflow-hidden">
      <View className="p-4 justify-center">
        <Text className="text-lg font-bold text-gray-800 mb-1">{name}</Text>
        <Text className="text-gray-600 text-sm mb-2">
          {suggestion}
        </Text>
        <Text className="text-gray-500 font-semibold">{date}</Text>
      </View>
    </View>
  );
};

export default CardSaran;
