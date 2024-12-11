import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import BaseUrl from "@/lib";
import InputText from "@/components/InputText";
import InputPassword from "@/components/InputPassword";
import ButtonBlue from "@/components/ButtonBlue";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [badge, setBadge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();

  const fetchApi = async () => {
    try {
      const response = await fetch(`${BaseUrl}/registerUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name , badge}),
      });

      const resData = await response.json();

      if (response.ok) {
        Alert.alert("Registrasi Berhasil", "Anda berhasil mendaftar!");
        router.push("/sign-in");
      } else {
        Alert.alert(
          "Registrasi Gagal",
          resData.message || "Terjadi kesalahan saat registrasi."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Tidak dapat terhubung ke server.");
      console.error("Error fetching data:", error);
    }
  };

  const handleRegister = () => {
    if (!email || !password || !name || !confirmPassword || !badge) {
      Alert.alert("Input required", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    fetchApi();
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="h-full">
        <View className="flex-1 bg-white rounded-t-xl  w-full px-4">
          <View className="flex-1 mt-10 gap-10">
            <View className="">
              <InputText
                keyboard="default"
                value={name}
                onChange={setName}
                text="Username"
                placeholder="Masukan username"
              />

              <InputText
                keyboard="default"
                value={email}
                onChange={setEmail}
                text="Email"
                placeholder="Masukan email"
              />

              <InputText
                keyboard="default"
                value={badge}
                onChange={setBadge}
                text="Badge"
                placeholder="Masukan badge"
              />

              <InputPassword
                placeholder="Masukan Password"
                value={password}
                text="Password"
                onChange={setPassword}
              />

              <InputPassword
                placeholder="Masukan Password"
                value={confirmPassword}
                text="Password"
                onChange={setConfirmPassword}
              />
            </View>
            <ButtonBlue handle={handleRegister} text="Daftar Sekarang" />
          </View>

          <Text className="text-abuabu text-center my-6 text-base">
            Sudah punya akun?{" "}
            <Link href="/sign-in" className="text-secondary">
              Login
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>

    // <SafeAreaView className="bg-blue-950 h-full">
    //   <ScrollView>
    //     <View className="min-h-[85vh] justify-center w-full px-4 my-6">
    //       <Text className="text-white text-center">PinjamTi</Text>
    //       <Text className="text-white text-center text-xl font-semibold">
    //         Ayo Daftar Akun
    //       </Text>
    //       <View className="mt-4">
    //         <Text className="text-white text-xs">Username</Text>
    //         <TextInput
    //           className="bg-gray-200 rounded-lg p-4 mt-1 w-full"
    //           value={name}
    //           onChangeText={setName}
    //           placeholder="Masukan Username"
    //           placeholderTextColor="#808080"
    //         />
    //       </View>

    //       <View className="mt-4">
    //         <Text className="text-white text-xs">Email</Text>
    //         <TextInput
    //           className="bg-gray-200 rounded-lg p-4 mt-1 w-full"
    //           value={email}
    //           onChangeText={setEmail}
    //           placeholder="Masukan Email"
    //           placeholderTextColor="#808080"
    //           keyboardType="email-address"
    //           autoCapitalize="none"
    //         />
    //       </View>

    //       <View className="mt-4">
    //         <Text className="text-white text-xs">Password</Text>
    //         <View className="flex-row items-center bg-gray-200 rounded-lg mt-1">
    //           <TextInput
    //             className="p-4 w-[90%]"
    //             value={password}
    //             onChangeText={setPassword}
    //             placeholder='Masukan Password'
    //             placeholderTextColor="#808080"
    //             secureTextEntry={!isPasswordVisible}
    //           />
    //           <TouchableOpacity
    //             onPress={() => setIsPasswordVisible(!isPasswordVisible)}
    //             className="pr-3"
    //           >
    //             <Ionicons
    //               name={isPasswordVisible ? "eye-off" : "eye"}
    //               size={20}
    //               color="#808080"
    //             />
    //           </TouchableOpacity>
    //         </View>
    //       </View>

    //       <View className="mt-4">
    //         <Text className="text-white text-xs">Confirm Password</Text>
    //         <View className="flex-row items-center bg-gray-200 rounded-lg mt-1">
    //           <TextInput
    //             className="p-4 w-[90%]"
    //             value={confirmPassword}
    //             onChangeText={setConfirmPassword}
    //             placeholder='Masukan Password'
    //             placeholderTextColor="#808080"
    //             secureTextEntry={!isPasswordVisible}
    //           />
    //           <TouchableOpacity
    //             onPress={() => setIsPasswordVisible(!isPasswordVisible)}
    //             className="pr-3"
    //           >
    //             <Ionicons
    //               name={isPasswordVisible ? "eye-off" : "eye"}
    //               size={20}
    //               color="#808080"
    //             />
    //           </TouchableOpacity>
    //         </View>
    //       </View>

    //       <TouchableOpacity
    //         className="bg-blue-400 p-3 mt-8 rounded-lg"
    //         onPress={handleRegister}
    //       >
    //         <Text className="text-white text-center font-semibold text-lg">
    //           Daftar
    //         </Text>
    //       </TouchableOpacity>

    //       <Text className="text-white text-center my-6 text-xs">
    //         Sudah Punya Akun?{" "}
    //         <Link href="/sign-in" className="text-blue-500">
    //           Masuk Sekarang
    //         </Link>
    //       </Text>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default SignUp;
