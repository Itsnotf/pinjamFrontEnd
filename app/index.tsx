import ButtonWhite from "@/components/ButtonWhite";
import { RoleID } from "@/lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const Dashboard = "./homeAdmin";
  const HomeUser = "./homeUser";
  const handleLink = () => {
    router.replace("/sign-in");
  };

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

  return (
    <View className="bg-[#013FC4] h-full">
      <View className="items-center justify-center h-1/2">
        <View className="bg-white p-5 rounded-xl">
          <Image source={require("../assets/images/Logo.png")} />
        </View>
      </View>
      <View className="mx-4 my-28 gap-20 h-full flex-1 justify-end ">
        <View>
          <Text className="text-white font-bold text-5xl">Selamat Datang</Text>
          <Text className="text-abu text-lg mt-10">
            Lakukan proses peminjaman
          </Text>
          <Text className="text-white font-semibold text-2xl">
            Cepat & Efisien
          </Text>
        </View>
        <ButtonWhite text="Mulai Sekarang" handle={handleLink} />
      </View>
    </View>
  );
}
