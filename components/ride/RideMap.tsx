import { calculateRegion } from "@/lib/map";
import React from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import flag from "../../assets/icons/flag.png";
import marker from "../../assets/icons/marker.png";

type Props = {
  ride: any;
};

const RideMap = ({ ride }: Props) => {
  const region = calculateRegion({
    userLatitude: parseFloat(ride.pickupLocation.latitude),
    userLongitude: parseFloat(ride.pickupLocation.longitude),
    destinationLatitude: parseFloat(ride.destination.latitude),
    destinationLongitude: parseFloat(ride.destination.longitude),
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
        image={marker}
      />
      <Marker
        coordinate={{
          latitude: ride.destination.latitude,
          longitude: ride.destination.longitude,
        }}
        title={ride.destination_address}
        image={flag}
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
