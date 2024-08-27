import HomeHeader from "@/components/home/HomeHeader";
import HomeMap from "@/components/home/HomeMap";
import HomeNearRides from "@/components/home/HomeNearRides";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function HomeScreen() {
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null
  );
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      }
    };

    requestLocation();
  }, []);

  if (!locationPermission) {
    return (
      <SafeAreaView className="mx-6 flex-1">
        <Text className="text-white">Location permission not granted</Text>
      </SafeAreaView>
    );
  }

  if (!userLocation) {
    return (
      <SafeAreaView className="mx-6 flex-1">
        <Text className="text-white">Loading location...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="mx-6 flex-1">
      <HomeHeader />
      <View className="h-3" />
      <HomeMap userLocation={userLocation} />
      <View className="h-5" />
      <Text className="text-white font-bold text-xl">Near Rides</Text>
      <View className="h-3" />
      <HomeNearRides />
    </SafeAreaView>
  );
}
