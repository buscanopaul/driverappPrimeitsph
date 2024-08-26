import rides from "@/mocks/data/Rides";
import React from "react";
import { FlatList, View } from "react-native";
import HomeNearRidesItem from "../home/HomeNearRidesItem";

type Props = {};

const RidesList = (props: Props) => {
  return (
    <FlatList
      data={rides.filter((ride) => ride.status !== "pending")}
      renderItem={(ride) => <HomeNearRidesItem ride={ride.item} />}
      keyExtractor={(ride) => ride.id}
      ItemSeparatorComponent={() => <View className="h-5" />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default RidesList;
