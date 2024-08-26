import { calculateRegion } from "@/lib/map";
import { useRouter } from "expo-router";
import React from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useSelector } from "react-redux";
import marker from "../../assets/icons/marker.png";
import target from "../../assets/icons/target.png";
import { RootState } from "../store";

type Props = {
  userLocation: any;
};

const HomeMap = ({ userLocation }: Props) => {
  const router = useRouter();
  const rides = useSelector((state: RootState) => state.rides.rides);
  const pendingRides = rides.filter((ride) => ride.status === "pending");

  const region = userLocation
    ? calculateRegion({
        userLatitude: userLocation.coords.latitude,
        userLongitude: userLocation.coords.longitude,
      })
    : null;

  const handleRide = (ride) => {
    router.push({
      pathname: `/ride/${ride.ride_id}`,
      params: { rideData: JSON.stringify(ride) },
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
        image={target}
      />
      {pendingRides.map((ride) => (
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
  );
};

export default HomeMap;
