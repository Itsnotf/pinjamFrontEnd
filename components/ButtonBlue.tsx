import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Barang from "@/app/(admin)/barang";


interface button{
    text: string,
    handle: any,
}

const ButtonBlue : React.FC<button> = ({text,handle}) => {
  return (
    <TouchableOpacity 
    className="w-fit bg-primary h-14 flex items-center justify-center rounded-xl"
    onPress={handle}>
        <Text className="text-white text-lg font-bold">{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBlue;
