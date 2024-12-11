import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";

interface Button {
    handle : any,
}

const ButtonDelete : React.FC<Button> = ({handle}) => {
  return (
    <TouchableOpacity
    onPress={() =>
      Alert.alert(
        "Konfirmasi Hapus",
        "Apakah Anda yakin ingin menghapus barang ini?",
        [
          {
            text: "Batal",
            style: "cancel",
          },
          {
            text: "Hapus",
            onPress: handle,
            style: "destructive",
          },
        ]
      )
    }
    className="w-10 h-10 justify-center items-center bg-secondary rounded-lg"
  >
    <MaterialIcons name="delete" size={18} color="white" />
  </TouchableOpacity>
  );
}

export default ButtonDelete;
