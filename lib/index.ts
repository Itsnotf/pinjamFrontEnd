import AsyncStorage from "@react-native-async-storage/async-storage";

const BaseUrl = "http://192.168.127.98:8000/api";
export default BaseUrl;

export const GambarUrl = "http://192.168.127.98:8000/storage";

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

export const userID = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("userID");
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

export const RoleID = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("RoleID");
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};
