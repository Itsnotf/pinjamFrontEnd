import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface ButtonImageProps {
  handler: () => void;
}

const ButtonImage: React.FC<ButtonImageProps> = ({ handler }) => {
  return (
    <TouchableOpacity
      onPress={handler}
      className="justify-center items-center w-12 h-12 bg-secondary rounded-xl">
      <Ionicons name="camera" size={18} color="white" />
    </TouchableOpacity>
  );
};

export default ButtonImage;
