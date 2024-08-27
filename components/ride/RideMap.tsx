import { calculateRegion } from "@/lib/map";
import React from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

type Location = {
  latitude: number;
  longitude: number;
};

type Props = {
  ride: {
    pickupLocation: Location;
    destination: Location;
    origin_address: string;
    destination_address: string;
  };
};

const RideMap = ({ ride }: Props) => {
  const region = calculateRegion({
    userLatitude: ride.pickupLocation.latitude,
    userLongitude: ride.pickupLocation.longitude,
    destinationLatitude: ride.destination.latitude,
    destinationLongitude: ride.destination.longitude,
  });

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-2/5 relative"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
      initialRegion={region}
    >
      <Marker
        coordinate={{
          latitude: ride.pickupLocation.latitude,
          longitude: ride.pickupLocation.longitude,
        }}
        title={ride.origin_address}
        image={require("@/assets/icons/marker.png")}
      />
      <Marker
        coordinate={{
          latitude: ride.destination.latitude,
          longitude: ride.destination.longitude,
        }}
        title={ride.destination_address}
        image={require("@/assets/icons/flag.png")}
      />
      <MapViewDirections
        origin={`${ride.pickupLocation.latitude},${ride.pickupLocation.longitude}`}
        destination={`${ride.destination.latitude},${ride.destination.longitude}`}
        apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
        strokeColor="black"
        strokeWidth={2}
      />
    </MapView>
  );
};

export default RideMap;
