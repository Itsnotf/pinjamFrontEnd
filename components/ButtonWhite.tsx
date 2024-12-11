import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Barang from "@/app/(admin)/barang";


interface button{
    text: string,
    handle: any,
}

const ButtonWhite : React.FC<button> = ({text,handle}) => {
  return (
    <TouchableOpacity 
    className="w-fit bg-white h-14 flex items-center justify-center rounded-xl shadow shadow-black"
    onPress={handle}>
        <Text className="text-primary text-lg font-bold">{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWhite;
