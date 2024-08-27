import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rides/store";
import HomeNearRidesItem from "./HomeNearRidesItem";

type Props = {};

const HomeNearRides = (props: Props) => {
  const rides = useSelector((state: RootState) => state.rides.rides);
  const pendingRides = rides.filter((ride) => ride.status === "pending");

  if (pendingRides.length === 0) {
    return (
      <View className="h-20 items-center justify-center">
        <Text className="text-gray-500 font-bold text-lg">
          No Available Rides
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pendingRides}
      renderItem={({ item }) => <HomeNearRidesItem ride={item} />}
      keyExtractor={(ride) => ride.id}
      ItemSeparatorComponent={() => <View className="h-5" />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeNearRides;
