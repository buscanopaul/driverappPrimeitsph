import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import HomeNearRidesItem from "./HomeNearRidesItem";

type Props = {};

const HomeNearRides = (props: Props) => {
  const rides = useSelector((state: RootState) => state.rides.rides);
  const pendingRides = rides.reduce((ride) =>
    ride.status === "pending" ? true : false
  );

  return (
    <>
      {rides && rides.length > 0 && pendingRides ? (
        <FlatList
          data={rides.filter((ride) => ride.status === "pending")}
          renderItem={(ride) => <HomeNearRidesItem ride={ride.item} />}
          keyExtractor={(ride) => ride.id}
          ItemSeparatorComponent={() => <View className="h-5" />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="h-20 items-center justify-center">
          <Text className="text-gray-500 font-bold text-lg">
            No Available Rides
          </Text>
        </View>
      )}
    </>
  );
};

export default HomeNearRides;
