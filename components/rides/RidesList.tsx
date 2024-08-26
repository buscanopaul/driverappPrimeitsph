import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rides/store";
import HomeNearRidesItem from "../home/HomeNearRidesItem";

type Props = {};

const RidesList = (props: Props) => {
  const rides = useSelector((state: RootState) => state.rides.rides);

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
