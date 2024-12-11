import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface input {
  value: string;
  onChange: any;
  placeholder: string;
  text: string;
}

const InputPassword: React.FC<input> = ({
  value,
  onChange,
  placeholder,
  text,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <View className="mt-4">
      <Text className="text-abuabu text-lg ">{text}</Text>
      <View className="flex-row items-center bg-abu rounded-lg mt-1">
        <TextInput
          className="p-4 w-[90%]"
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#adadad"
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          className="pr-3"
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="#808080"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputPassword;
