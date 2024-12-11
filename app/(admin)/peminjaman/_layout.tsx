import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Make sure this is installed

const PeminjamanLayout = () => {
  const router = useRouter(); // Use this to navigate back

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: "#013FC4",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          title: "List Peminjaman",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push("/(admin)/peminjaman/laporan");
              }}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="print" size={24} color="white" />
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
          headerTintColor: "white",
          headerTitleAlign: "center",
          title: "Detail Peminjaman",
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
      <Stack.Screen
        name="laporan"
        options={{
          headerStyle: {
            backgroundColor: "#013FC4",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          title: "Cetak Laporan",
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

export default PeminjamanLayout;
