import * as Location from "expo-location"
console.log("Location object: ", Location)
export const getCurrentLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      throw new Error("Permission to access location was denied")
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    })

    return location.coords // Returning the coordinates
  } catch (error) {
    console.error("Error fetching location:", error)
    throw error // Re-throw to handle error where called
  }
}
