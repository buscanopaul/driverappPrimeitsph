import { calculateRegion } from "@/lib/map";
import { LocationObject } from "expo-location";
import { useRouter } from "expo-router";
import React from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rides/store";

type Props = {
  userLocation: LocationObject;
};

const HomeMap = ({ userLocation }: Props) => {
  const router = useRouter();
  const rides = useSelector((state: RootState) => state.rides.rides);
  const pendingRides = rides.filter((ride) => ride.status === "pending");

  const region = calculateRegion({
    userLatitude: userLocation.coords.latitude,
    userLongitude: userLocation.coords.longitude,
  });

  const handleRide = (ride) => {
    router.push({
      pathname: "/ride/[id]" as const,
      params: { id: ride.id, rideData: JSON.stringify(ride) },
    });
  };

  return (
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
        image={require("@/assets/icons/target.png")}
      />
      {pendingRides.map((ride) => (
        <Marker
          key={ride.id}
          coordinate={{
            latitude: ride.pickupLocation?.latitude,
            longitude: ride.pickupLocation?.longitude,
          }}
          title={`Going to: ${ride.destinationAddress}`}
          image={require("@/assets/icons/marker.png")}
          onPress={() => handleRide(ride)}
        />
      ))}
    </MapView>
  );
};

export default HomeMap;
