import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { router, Slot, Stack, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const AuthLayout = () => {
  return (
    <>
      <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: true,
          headerTitle: "Login",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#013FC4", 
          },
          headerTintColor: "white", 
        }}
      />
       <Stack.Screen
        name="sign-up"
        options={{
          headerShown: true,
          headerTitle: "Sign In",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#013FC4", 
          },
          headerTintColor: "white", 
        
        }}
      />
      </Stack>
    </>
  );
};

export default AuthLayout;
