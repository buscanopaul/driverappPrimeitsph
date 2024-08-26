import { statusColors } from "@/constants/Colors";
import { calculateDistance } from "@/utils/calculateDistance";
import { useFormattedNumber } from "@/utils/useFormattedNumber";
import { useFormattedTime } from "@/utils/useFormattedTime";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  ride: any;
};

const HomeNearRidesItem = ({ ride }: Props) => {
  const router = useRouter();

  const { value, unit } = calculateDistance(
    parseFloat(ride.pickupLocation.latitude),
    parseFloat(ride.pickupLocation.longitude),
    parseFloat(ride.destination.latitude),
    parseFloat(ride.destination.longitude)
  );

  const handleRide = () => {
    router.push({
      pathname: `ride/${ride.ride_id}`,
      params: { rideData: JSON.stringify(ride) },
    });
  };

  return (
    <Pressable
      onPress={handleRide}
      className="bg-white p-3 rounded-md active:opacity-70"
    >
      {ride.status === "dropped-off" && (
        <View className="flex-row items-center justify-between mb-4">
          <View
            style={{
              backgroundColor: statusColors[ride.status],
              alignSelf: "flex-start",
            }}
            className="p-2 rounded-lg"
          >
            <Text className="text-white uppercase">{ride.status}</Text>
          </View>
          <Text>{useFormattedTime(ride.timeArrived)}</Text>
        </View>
      )}
      <View className="flex flex-row items-start gap-1 w-[90%]">
        <Image
          source={require("../../assets/icons/origin.png")}
          className="h-5 w-5"
        />
        <Text className="">{ride.originAddress}</Text>
      </View>
      <Image
        source={require("../../assets/icons/separator.png")}
        className="h-4 w-4 pl-5"
      />
      <View className="flex flex-row items-start gap-1 w-[90%]">
        <Image
          source={require("../../assets/icons/finish.png")}
          className="h-5 w-5"
        />
        <Text className="">{ride.destinationAddress}</Text>
      </View>
      <View className="border-[0.5px] border-gray-400 my-4" />
      <View className="flex flex-row items-center justify-between">
        <View className="bg-green-300 px-2 py-1 rounded-lg">
          <Text className="text-md ">
            {value} {unit}
          </Text>
        </View>
        <Text className="font-bold text-lg">
          ₱{useFormattedNumber(ride.farePrice)}
        </Text>
      </View>
    </Pressable>
  );
};

export default HomeNearRidesItem;
