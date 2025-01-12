import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import React, { useState } from "react";

interface SelectInputProps {
  label: string;
  options: { label: string; value: number }[]; // Value sekarang tipe number
  onSelect: (value: number) => void; // Mengembalikan number
}

const SelectInput: React.FC<SelectInputProps> = ({ label, options, onSelect }) => {
  const [selected, setSelected] = useState<number | null>(null); // State untuk value berupa number
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: number) => { // Terima value number
    setSelected(value);
    setModalVisible(false);
    onSelect(value); // Kembalikan value sebagai number
  };

  return (
    <View className="mt-4">
      <Text className="text-abuabu text-lg">{label}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-abu rounded-xl text-secondary text-lg p-4 mt-1 w-full"
      >
        <Text className={`text-lg ${selected !== null ? "text-secondary" : "text-gray-400"}`}>
          {selected !== null
            ? options.find((opt) => opt.value === selected)?.label
            : "Pilih opsi..."}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          onPress={() => setModalVisible(false)}
        />
        <View className="absolute bottom-0 w-full bg-white rounded-t-xl p-4 shadow-lg">
          <Text className="text-lg font-bold text-gray-800 mb-4">Pilih Opsi</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value.toString()} // Konversi number ke string untuk key
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item.value)}
                className="py-3 border-b border-gray-200"
              >
                <Text className="text-secondary text-lg">{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default SelectInput;
