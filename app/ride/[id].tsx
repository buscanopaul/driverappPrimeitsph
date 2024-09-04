import { calculateDriverTime } from "@/lib/map";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import RideMap from "@/components/ride/RideMap";
import {
  updateRideStatus,
  updateRideTimeArrived,
} from "@/features/rides/ridesSlice";
import { RootState } from "@/features/rides/store";
import { calculateDistance } from "@/utils/calculateDistance";
import { useFormattedNumber } from "@/utils/useFormattedNumber";
import { useFormattedTime } from "@/utils/useFormattedTime";
import * as Linking from "expo-linking";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const RideDetails = (props: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [duration, setDuration] = useState("");

  const { id } = useLocalSearchParams<{ id: string }>();

  const ride = useSelector((state: RootState) =>
    state.rides.rides.find((r) => r.id === id)
  );
  const rides = useSelector((state: RootState) => state.rides.rides);

  const { value, unit } = calculateDistance(
    ride?.pickupLocation.latitude,
    ride?.pickupLocation.longitude,
    ride?.destination.latitude,
    ride?.destination.longitude
  );

  if (!ride) {
    return <Text>No ride data available</Text>;
  }

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

  const hasInProgressRide = rides.some(
    (r) =>
      (r.status === "accepted" || r.status === "picked-up") && r.id !== ride.id
  );

  const handleStatusUpdate = useCallback(() => {
    if (hasInProgressRide) {
      Alert.alert("Error", "You have an in-progress ride.");
      return;
    }
    if (ride.status === "pending") {
      dispatch(updateRideStatus({ id: ride.id, status: "accepted" }));
    }

    if (ride.status === "accepted") {
      dispatch(updateRideStatus({ id: ride.id, status: "picked-up" }));
    }

    if (ride.status === "picked-up") {
      dispatch(updateRideStatus({ id: ride.id, status: "dropped-offs" }));
      dispatch(
        updateRideTimeArrived({
          id: ride.id,
          timeArrived: new Date().toISOString(),
        })
      );
    }
  }, [ride, rides]);

  if (!ride) {
    return <Text>No ride data available</Text>;
  }

  const getButtonColor = () => {
    if (!ride) return "bg-gray-200";
    switch (ride.status) {
      case "pending":
        return "bg-green-300";
      case "accepted":
        return "bg-orange-200";
      case "picked-up":
        return "bg-blue-200";
      case "dropped-off":
        return "bg-gray-200";
      case "dropped-offs":
        return "bg-gray-200";
      default:
        return "bg-gray-200";
    }
  };

  const getStatusText = () => {
    if (!ride) return "No ride found";
    if (ride.status === "pending") return "Let's get started!";
    if (ride.status === "accepted") return "Pick up";
    if (ride.status === "picked-up") return "Drop off";
    return "Completed";
  };

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
            {ride.status !== "dropped-offs"
              ? "Estimated Travel Time"
              : "Time arrived"}
          </Text>
        </View>
        <Text className="text-white">
          {ride.status !== "dropped-off"
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
            <Text className="font-bold text-xl">
              ₱{useFormattedNumber(ride.farePrice)}
            </Text>
          </View>
        </View>
        <View className="h-40" />
      </ScrollView>
      <Pressable
        style={{ width: Dimensions.get("window").width - 50 }}
        className={`absolute bottom-10 mx-6 ${getButtonColor()}  p-4 rounded-full`}
        onPress={handleStatusUpdate}
      >
        <Text className="font-bold text-center">{getStatusText()}</Text>
      </Pressable>
    </View>
  );
};

export default RideDetails;
