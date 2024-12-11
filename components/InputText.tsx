import { View, Text, TextInput } from "react-native";
import React from "react";

interface input {
    value: string;
    onChange : any,
    placeholder : string,
    text : string
    keyboard : any
}

const InputText : React.FC<input> = ({value,onChange,placeholder,text , keyboard}) => {
  return (
    <View className="mt-4">
      <Text className="text-abuabu text-lg ">{text}</Text>
      <TextInput
        className="bg-abu rounded-xl text-secondary text-lg p-4 mt-1 w-full"
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#ADADAD"
        keyboardType={keyboard}
      />
    </View>
  );
};

export default InputText;
