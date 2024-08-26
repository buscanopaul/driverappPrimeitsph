import rides from "@/mocks/data/Rides";
import React from "react";
import { FlatList, View } from "react-native";
import HomeNearRidesItem from "./HomeNearRidesItem";

type Props = {};

const HomeNearRides = (props: Props) => {
  return (
    <FlatList
      data={rides.filter((ride) => ride.status === "pending")}
      renderItem={(ride) => <HomeNearRidesItem ride={ride.item} />}
      keyExtractor={(ride) => ride.id}
      ItemSeparatorComponent={() => <View className="h-5" />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeNearRides;
