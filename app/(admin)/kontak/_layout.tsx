import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const KontakLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#013FC4",
          },
          title: "List Kontak",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/(admin)/homeAdmin")}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push("/(admin)/kontak/create");
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
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#013FC4",
          },
          headerTitleAlign: "center",
          title: "Detail Kontak",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/(admin)/kontak")}
              style={{ marginLeft: 15 }}
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
          headerTintColor: "white",
          headerTitleAlign: "center",
          title: "Create Kontak",
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

export default KontakLayout;
