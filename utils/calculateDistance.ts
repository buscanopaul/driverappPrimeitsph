export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { value: number; unit: string } {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c; // Distance in kilometers

  if (distanceKm < 1) {
    // If less than 1 km, return distance in meters
    return { value: Math.round(distanceKm * 1000), unit: "m" };
  } else {
    // Otherwise, return distance in kilometers
    return { value: Math.round(distanceKm), unit: "km" };
  }
}
