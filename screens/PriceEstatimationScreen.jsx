import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
 
} from "react-native"
import { fetchPriceEstimates } from "../service/priceEstimator"
import { Picker } from "@react-native-picker/picker"

export default function PriceEstimationScreen() {
  const [crop, setCrop] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("price") // Default sorting by price
  const [suggestions, setSuggestions] = useState([])

  const cropSuggestions = [
    "Maize",
    "Rice",
    "Wheat",
    "Potato",
    "Tomato",
    "Onion",
    "Cabbage",
    "Carrot",
    "Beans",
    "Sugarcane",
  ]

  const handleSearch = async () => {
    if (!crop.trim()) {
      alert("Please enter a produce name")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const priceData = await fetchPriceEstimates(crop, null, sortBy)
      if (priceData.length === 0) {
        setError("No results found for this crop.")
      }
      setResults(priceData)
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Filter suggestions based on user input
  const handleInputChange = (text) => {
    setCrop(text)
    setSuggestions(
      cropSuggestions.filter((crop) =>
        crop.toLowerCase().includes(text.toLowerCase())
      )
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Price Finder Tool</Text>
        <Text style={styles.headerSubtext}>
          Search for prices of produce in different markets.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search for produce (e.g., Maize)"
        value={crop}
        onChangeText={handleInputChange}
      />

      {suggestions.length > 0 && crop.trim() && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => {
                setCrop(item)
                setSuggestions([]) // Hide suggestions once selected
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>View Prices</Text>
      </TouchableOpacity>

      {/* Sorting Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Sort by:</Text>
        <Picker
          selectedValue={sortBy}
          style={styles.picker}
          onValueChange={(itemValue) => setSortBy(itemValue)}
        >
          <Picker.Item label="Price" value="price" />
          <Picker.Item label="Distance" value="distance" />
        </Picker>
      </View>

      {loading && <ActivityIndicator size="large" color="#4CAF50" />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultCard}>
            <Text style={styles.marketName}>{item.market_name}</Text>
            <Text>Price: TSh {item.price}</Text>
            <Text>Distance: {item.distance} km</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  headerSubtext: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: "#ddd",
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  sortContainer: {
    marginVertical: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    width: 150,
    height: 40,
  },
  resultCard: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 5,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  marketName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
})
