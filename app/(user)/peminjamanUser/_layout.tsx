import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Make sure this is installed

const PeminjamanUserLayout = () => {
  const router = useRouter(); // Use this to navigate back

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: "#013FC4", 
          },
          headerTintColor:'white',
          headerTitleAlign: "center",
          title: "List Peminjaman",
          headerLeft: () => (
            <TouchableOpacity
            
              onPress={() => router.push("/homeUser")} // Navigates directly to homeUser
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
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
          headerTintColor:'white',
          headerTitleAlign: "center",
          title: "Detail Peminjaman",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push('/peminjamanUser')}
              style={{ marginLeft: 15 }} 
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
   
    </Stack>
  );
};

export default PeminjamanUserLayout;
