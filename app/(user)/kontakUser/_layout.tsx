import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Make sure this is installed

const KontakUserLayout = () => {
  const router = useRouter(); // Use this to navigate back

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: "#013FC4", 
          },
          headerTintColor: 'white',
          headerTitleAlign: "center",
          title: "List Kontak",
          headerLeft: () => (
            <TouchableOpacity
            
              onPress={() => router.push("/homeUser")}
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

export default KontakUserLayout;
