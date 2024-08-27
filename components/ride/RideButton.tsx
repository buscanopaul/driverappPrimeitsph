import React from "react";
import { Alert, Dimensions, Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rides/store";

type RideStatus =
  | "pending"
  | "dropped-off"
  | "accepted"
  | "declined"
  | "started"
  | "picked-up";

type Props = {
  rideId: string;
  onStatusUpdate: (newStatus: RideStatus) => void;
};

const RideButton = ({ rideId, onStatusUpdate }: Props) => {
  const acceptedStatuses: readonly RideStatus[] = ["accepted", "picked-up"];

  const ride = useSelector((state: RootState) =>
    state.rides.rides.find((r) => r.id === rideId)
  );

  const rides = useSelector((state: RootState) => state.rides.rides);

  const hasAcceptedRide = rides.some((rideStatus) => {
    return (
      acceptedStatuses.includes(rideStatus.status.toLowerCase()) &&
      rideStatus.id !== rideId
    );
  });

  const handleStatusUpdate = () => {
    if (!ride) return;

    if (!hasAcceptedRide) {
      const newStatus = getNextStatus(ride.status);
      if (newStatus) onStatusUpdate(newStatus);
    } else {
      Alert.alert("Error", "You have an in-progress ride.");
    }
  };

  const getNextStatus = (currentStatus: RideStatus): RideStatus | null => {
    switch (currentStatus) {
      case "pending":
        return "accepted";
      case "accepted":
        return "picked-up";
      case "picked-up":
        return "dropped-off";
      default:
        return null;
    }
  };

  const getStatusText = () => {
    if (!ride) return "No ride found";
    if (ride.status === "pending") return "Let's get started!";
    if (ride.status === "accepted") return "Pick up";
    if (ride.status === "picked-up") return "Drop off";
    return "Completed";
  };

  const isButtonActive = ride && ride.status !== "dropped-off";

  return (
    <Pressable
      style={{ width: Dimensions.get("window").width - 50 }}
      className={`absolute bottom-10 mx-6 ${
        ride && ride.status !== "dropped-off"
          ? "bg-green-300 active:opacity-70"
          : "bg-gray-200"
      }  p-4 rounded-full`}
      onPress={isButtonActive ? handleStatusUpdate : undefined}
    >
      <Text className="font-bold text-center">{getStatusText()}</Text>
    </Pressable>
  );
};

export default RideButton;
