import { calculateDriverTime } from "@/lib/map";
import { calculateDistance } from "@/utils/calculateDistance";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import RideMap from "@/components/ride/RideMap";
import { useFormattedTime } from "@/utils/useFormattedTime";
import * as Linking from "expo-linking";

type Props = {};

const RideDetails = (props: Props) => {
  const navigation = useNavigation();
  const [duration, setDuration] = useState("");

  const { rideData } = useLocalSearchParams<{
    id: string;
    rideData: string;
  }>();

  const ride = rideData ? JSON.parse(rideData) : null;

  if (!ride) {
    return <Text>No ride data available</Text>;
  }

  const { value, unit } = calculateDistance(
    parseFloat(ride.pickupLocation.latitude),
    parseFloat(ride.pickupLocation.longitude),
    parseFloat(ride.destination.latitude),
    parseFloat(ride.destination.longitude)
  );

  const dialCall = () => {
    Linking.openURL(`sms:${ride.userPhone}`);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const fetchDuration = async () => {
      const duration = await calculateDriverTime(ride);
      setDuration(duration);
    };

    if (ride) {
      fetchDuration();
    }
  }, [ride]);

  return (
    <View className="flex-1 bg-white relative">
      <RideMap ride={ride} />
      <Pressable
        className="absolute top-16 left-4 p-2 bg-white rounded-lg shadow-xl active:opacity-70 w-10 h-10 z-10"
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="back" size={24} color="black" />
      </Pressable>
      <View className="px-6 bg-black py-4 pb-8 rounded-t-xl -top-1 flex flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <FontAwesome5 name="directions" size={24} color="white" />
          <Text className="text-white">
            {ride.status === "pending"
              ? "Estimated Travel Time"
              : "Time arrived"}
          </Text>
        </View>
        <Text className="text-white">
          {ride.status === "pending"
            ? duration
            : useFormattedTime(ride.timeArrived)}
        </Text>
      </View>
      <View className="bg-white h-4 rounded-t-xl -top-5" />
      <ScrollView>
        <View className="px-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Image
              source={require("../../assets/images/unkown.jpg")}
              className="w-11 h-11 rounded-lg"
            />
            <View className="w-3/4">
              <Text className="font-bold text-lg">{ride.userName}</Text>
              <Text className="text-gray-600">Customer Name</Text>
            </View>
          </View>
          <Pressable
            className="bg-black p-2 rounded-full active:opacity-70"
            onPress={ride.status === "pending" ? dialCall : null}
          >
            <Entypo name="phone" size={24} color="white" />
          </Pressable>
        </View>
        <View className="h-5" />
        <View className="px-6 w-[99%]">
          <View className="flex flex-row items-center gap-3">
            <Image
              source={require("../../assets/icons/origin.png")}
              className="h-5 w-5"
            />
            <Text className="text-lg">{ride.originAddress}</Text>
          </View>
          <Image
            source={require("../../assets/icons/separator.png")}
            className="h-4 w-4 pl-5"
          />
          <View className="flex flex-row items-center gap-3">
            <Image
              source={require("../../assets/icons/finish.png")}
              className="h-5 w-5"
            />
            <Text className="text-lg">{ride.destinationAddress}</Text>
          </View>
          <View className="border-[0.5px] border-gray-400 my-4" />
          <View className="flex flex-row items-center justify-between">
            <View className="bg-black p-2 rounded-md">
              <Text className="text-md text-white">
                {value} {unit}
              </Text>
            </View>
            <Text className="font-bold text-xl">₱{ride.farePrice}</Text>
          </View>
        </View>
        <View className="h-40" />
      </ScrollView>

      <Pressable
        style={{ width: Dimensions.get("window").width - 50 }}
        className={`absolute bottom-10 mx-6 ${
          ride.status === "pending"
            ? "bg-green-300 active:opacity-70"
            : "bg-gray-200"
        }  p-4 rounded-full`}
      >
        <Text className="font-bold text-center">
          {ride.status === "pending" ? "Let's get started!" : "Completed"}
        </Text>
      </Pressable>
    </View>
  );
};

export default RideDetails;
