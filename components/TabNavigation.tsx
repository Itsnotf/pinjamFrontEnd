import BarangLayout from "@/app/(admin)/barang/_layout";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Stack } from "expo-router";

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Barang"
        component={BarangLayout}
        options={{
          tabBarLabel: "Barang", // Define your tab label here
        }}
      />
      {/* Add other Tab screens here if needed */}
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
