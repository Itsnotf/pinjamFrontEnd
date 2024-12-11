import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const useImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    Alert.alert("Pilih Gambar", "Pilih sumber gambar", [
      {
        text: "Galeri",
        onPress: async () => {
          await ImagePicker.requestMediaLibraryPermissionsAsync();
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled && result.assets) {
            setSelectedImage(result.assets[0].uri);
          }
        },
      },
      {
        text: "Kamera",
        onPress: async () => {
          await ImagePicker.requestCameraPermissionsAsync();
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled && result.assets) {
            setSelectedImage(result.assets[0].uri);
          }
        },
      },
      { text: "Batal", style: "cancel" },
    ]);
  };

  return { selectedImage, pickImage };
};

export default useImagePicker;
