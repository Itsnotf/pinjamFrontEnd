import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";

interface Button {
  handle: any;
}

const ButtonEdit: React.FC<Button> = ({ handle }) => {
  return (
    <TouchableOpacity
      onPress={handle}
      className="w-10 h-10 justify-center items-center bg-secondary rounded-lg"
    >
      <Feather name="edit" size={18} color="white" />
    </TouchableOpacity>
  );
};

export default ButtonEdit;
