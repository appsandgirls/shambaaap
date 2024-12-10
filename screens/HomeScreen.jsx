import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Shamba App!</Text>
        <Text style={styles.welcomeSubtitle}>
          Your companion for a healthier, more productive farm.
        </Text>
      </View>

      {/* Weather Info Section */}
      <View style={styles.weatherSection}>
        <Text style={styles.weatherTitle}>Weather Information</Text>
        <View style={styles.weatherDetails}>
          <WeatherCard icon="thermometer" label="Temperature" value="28°C" />
          <WeatherCard icon="water-outline" label="Humidity" value="65%" />
          <WeatherCard icon="weather-rainy" label="Rainfall" value="12mm" />
          <WeatherCard icon="weather-windy" label="Windspeed" value="14 km/h" />
        </View>
      </View>

      {/* Diagnose Issues Button */}
      <TouchableOpacity
        style={styles.diagnoseButton}
        onPress={() => navigation.navigate("Plant Health")}
      >
        <Ionicons name="camera" size={24} color="white" />
        <Text style={styles.diagnoseText}>Diagnose Issues with Crop</Text>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </TouchableOpacity>

      {/* Features Section */}
      <View style={styles.featuresContainer}>
        <FeatureCard
          icon="person-circle"
          title="Farm Profile"
          description="Manage your farm's details and crops."
          onPress={() => navigation.navigate("Farm Profile")}
        />
        <FeatureCard
          icon="leaf"
          title="Farming Advice"
          description="Get tips to improve your farming techniques."
          onPress={() => navigation.navigate("Farming Advice")}
        />
        <FeatureCard
          icon="book"
          title="Resources"
          description="Explore educational resources for better farming."
          onPress={() => navigation.navigate("Resources")}
        />
        <FeatureCard
          icon="cart"
          title="Marketplace"
          description="Buy and sell farming products."
          onPress={() => navigation.navigate("Marketplace")}
        />
      </View>
    </ScrollView>
  )
}

function WeatherCard({ icon, label, value }) {
  return (
    <View style={styles.weatherCard}>
      <MaterialCommunityIcons name={icon} size={28} color="#388E3C" />
      <Text style={styles.weatherLabel}>{label}</Text>
      <Text style={styles.weatherValue}>{value}</Text>
    </View>
  )
}

function FeatureCard({ icon, title, description, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Ionicons name={icon} size={40} color="#4CAF50" style={styles.cardIcon} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f8f4",
  },
  welcomeSection: {
    backgroundColor: "#388E3C",
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 60,
    alignItems: "center",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
  weatherSection: {
    backgroundColor: "white",
    padding: 15,
    marginTop: -30, // Overlap effect
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388E3C",
    marginBottom: 10,
  },
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weatherCard: {
    alignItems: "center",
    padding: 10,
  },
  weatherLabel: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  weatherValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#388E3C",
  },
  diagnoseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4CAF50",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  diagnoseText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  featuresContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388E3C",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
})
