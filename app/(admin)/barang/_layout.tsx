import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Make sure this is installed

const BarangLayout = () => {
  const router = useRouter(); // Use this to navigate back

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitleAlign: "center",
          headerTintColor : 'white',
          headerStyle: {
            backgroundColor: "#013FC4", 
          },
          title: "List Barang",
          headerLeft: () => (
            <TouchableOpacity

              onPress={() => router.push('/(admin)/homeAdmin')} 
              style={{ marginLeft: 15 }} 
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push('/(admin)/barang/create');
              }}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerStyle: {
            backgroundColor: "#013FC4", 
          },
          headerTintColor: 'white',
          headerTitleAlign: "center",
          title: "Detail Barang",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()} // This goes back to the previous screen
              style={{ marginLeft: 15 }} // Adjust margin as needed
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="create"
        options={{
          headerStyle: {
            backgroundColor: "#013FC4", 
          },
          headerTintColor: 'white',
          headerTitleAlign: "center",
          title: "Create Barang",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()} // This goes back to the previous screen
              style={{ marginLeft: 15 }} // Adjust margin as needed
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default BarangLayout;
