import React from "react";
import { Image, Text, View } from "react-native";

type Props = {};

const HomeHeader = (props: Props) => {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-white font-bold text-xl">Welcome back, Paul</Text>
      <Image
        source={require("../../assets/images/unkown.jpg")}
        className="h-8 w-8 rounded-full"
      />
    </View>
  );
};

export default HomeHeader;
