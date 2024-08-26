import RidesList from "@/components/rides/RidesList";
import { SafeAreaView, Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="px-6">
        <Text className="font-bold text-2xl text-white">Recent Rides</Text>
        <View className="h-4" />
        <RidesList />
      </View>
    </SafeAreaView>
  );
}
