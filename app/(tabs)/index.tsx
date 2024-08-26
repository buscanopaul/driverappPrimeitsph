import HomeHeader from "@/components/home/HomeHeader";
import HomeNearRides from "@/components/home/HomeNearRides";
import { calculateRegion } from "@/lib/map";
import rides from "@/mocks/data/Rides";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import marker from "../../assets/icons/marker.png";
import target from "../../assets/icons/target.png";

export default function HomeScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(false);
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      setHasPermission(true);
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    };

    requestLocation();
  }, []);

  const region = userLocation
    ? calculateRegion({
        userLatitude: userLocation.coords.latitude,
        userLongitude: userLocation.coords.longitude,
      })
    : null;

  if (!hasPermission) {
    return (
      <SafeAreaView className="mx-6 flex-1">
        <Text className="text-white">Location permission not granted</Text>
      </SafeAreaView>
    );
  }

  if (!userLocation || !region) {
    return (
      <SafeAreaView className="mx-6 flex-1">
        <Text className="text-white">Loading location...</Text>
      </SafeAreaView>
    );
  }

  const handleRide = (ride) => {
    router.push({
      pathname: `/ride/${ride.ride_id}`,
      params: { rideData: JSON.stringify(ride) },
    });
  };

  return (
    <SafeAreaView className="mx-6 flex-1">
      <HomeHeader />
      <View className="h-3" />
      <MapView
        provider={PROVIDER_DEFAULT}
        className="w-full h-1/2"
        tintColor="black"
        mapType="mutedStandard"
        showsPointsOfInterest={false}
        showsUserLocation={true}
        userInterfaceStyle="light"
        initialRegion={region}
      >
        <Marker
          coordinate={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          }}
          title="current location"
          image={target}
        />
        {rides.map((ride) => (
          <Marker
            key={ride.id}
            coordinate={{
              latitude: ride.pickupLocation?.latitude,
              longitude: ride.pickupLocation?.longitude,
            }}
            title={`Going to: ${ride.destinationAddress}`}
            image={marker}
            onPress={() => handleRide(ride)}
          />
        ))}
      </MapView>
      <View className="h-5" />
      <Text className="text-white font-bold text-xl">Near Rides</Text>
      <View className="h-3" />
      <HomeNearRides />
    </SafeAreaView>
  );
}
