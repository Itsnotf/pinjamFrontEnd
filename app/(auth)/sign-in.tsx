import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import BaseUrl, { RoleID, userID } from "@/lib";
import InputText from "@/components/InputText";
import InputPassword from "@/components/InputPassword";
import ButtonBlue from "@/components/ButtonBlue";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Dashboard = "../(admin)/homeAdmin";
  const HomeUser = "../(user)/homeUser";
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const roleID = await RoleID();
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          if (roleID === "1") {
            router.replace(Dashboard);
          } else {
            router.replace(HomeUser);
          }
        }
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    };

    checkToken();
  }, []);

  const fetchApi = async () => {
    try {
      const response = await fetch(`${BaseUrl}/loginUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }

      const resdata = await response.json();

      if (resdata.token) {
        const userId = resdata.data.id;
        const roleId = resdata.data.id_role;

        const userIdString = userId.toString();
        const roleIdString = roleId.toString();

        await AsyncStorage.setItem("authToken", resdata.token);
        await AsyncStorage.setItem("userID", userIdString);
        await AsyncStorage.setItem("RoleID", roleIdString);

        if (resdata.data.id_role === 1) {
          router.replace(Dashboard);
        } else {
          router.replace(HomeUser);
        }
      } else {
        Alert.alert("Login failed", "Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert(
        "Login error",
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Input required", "Please enter both email and password.");
      return;
    }
    fetchApi();
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="h-full">
        <View className="flex-1 bg-white rounded-t-xl  w-full px-4">
          <Text className="text-center text-secondary text-3xl my-10 font-semibold">
            Hallo, Selamat Datang
          </Text>
          <View className="flex-1  gap-10">
            <View className="">
              <InputText
                keyboard={'email-address'}
                value={email}
                onChange={setEmail}
                text="Email"
                placeholder="Masukan email"
              />

              <InputPassword
                placeholder="Masukan Password"
                value={password}
                text="Password"
                onChange={setPassword}
              />
            </View>
            <ButtonBlue handle={handleLogin} text="Masuk" />
          </View>

          <Text className="text-abuabu text-center my-6 text-base">
            Belum Punya Akun?{" "}
            <Link href="/sign-up" className="text-secondary">
              Register
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
