import { View, Text, TextInput, Keyboard } from "react-native";
import React from "react";

interface input {
    value: string;
    onChange : any,
    placeholder : string,
    text : string
    edit : any
    keyboard : any
}

const InputTextEdit : React.FC<input> = ({value,onChange,placeholder,text,edit,keyboard}) => {
  return (
    <View className="mt-4">
      <Text className="text-abuabu text-lg ">{text}</Text>
      <TextInput
        className="bg-abu rounded-xl text-secondary text-lg p-4 mt-1 w-full"
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#ADADAD"
        editable={edit}
        keyboardType={keyboard}
      />
    </View>
  );
};

export default InputTextEdit;
