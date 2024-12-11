import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Make sure this is installed

const SaranLayout = () => {
  const router = useRouter(); // Use this to navigate back

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: "#013FC4",
          },
          headerTitleAlign: "center",
          title: "List Saran",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()} 
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

export default SaranLayout;
