import { db } from "../firebase" // Import the Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore"
import { getCurrentLocation } from "../utils/locationHelper"

export const fetchPriceEstimates = async (crop, location, sortBy = "price") => {
  try {
    // Get current location of farmer if location is not provided
    const farmerLocation = location || (await getCurrentLocation())
    console.log("Farmer's Location", farmerLocation)

    // Query Firebase for market data
    const q = query(collection(db, "markets"), where("crop", "==", crop))
    const querySnapshot = await getDocs(q)

    let marketsData = []

    // Process the data and calculate distance
    querySnapshot.forEach((doc) => {
      const market = doc.data()
      const marketLocation = market.location
      console.log("Market's Location", marketLocation)

      // Calculate distance from farmer's location to market's location
      const distance = calculateDistance(farmerLocation, marketLocation)

      // Store market data
      marketsData.push({
        market_name: market.name,
        price: market.price,
        distance: distance,
        market_location: marketLocation,
      })
    })

    // Sort based on user's choice (price or distance)
    if (sortBy === "price") {
      marketsData.sort((a, b) => a.price - b.price)
    } else if (sortBy === "distance") {
      marketsData.sort((a, b) => a.distance - b.distance)
    }

    return marketsData
  } catch (error) {
    console.error("Error fetching market data:", error)
  }
}

// Function to calculate distance between two locations (Haversine formula)
/* The haversine formula is a mathematical equation used to calculate the 
distance between two points on a sphere using their latitude and longitude 
coordinates: 
*/
const calculateDistance = (farmerLocation, marketLocation) => {
  const R = 6371 // Radius of the Earth in km

  // Convert degrees to radians
  const lat1 = farmerLocation.latitude * (Math.PI / 180)
  const lon1 = farmerLocation.longitude * (Math.PI / 180)
  const lat2 = marketLocation.latitude * (Math.PI / 180)
  const lon2 = marketLocation.longitude * (Math.PI / 180)

  // Difference in coordinates
  const dLat = lat2 - lat1
  const dLon = lon2 - lon1

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  // Distance in km
  const distance = R * c
  return distance.toFixed(2) // rounded to 2 decimal places
}
