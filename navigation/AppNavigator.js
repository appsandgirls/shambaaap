import React from "react"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { createStackNavigator } from "@react-navigation/stack" // Import Stack.Navigator
import HomeScreen from "../screens/HomeScreen"
import MarketplaceScreen from "../screens/MarketplaceScreen"
import ProductDetailsScreen from "../screens/ProductDetailsScreen" // Import ProductDetailsScreen
import FarmingAdviceScreen from "../screens/FarmingAdviceScreen"
import EducationalResourcesScreen from "../screens/EducationalResourcesScreen"
import PlantHealthDetectorScreen from "../screens/PlantHealthDetectorScreen"
import FarmProfileScreen from "../screens/FarmProfileScreen"
import PriceEstimationScreen from "../screens/PriceEstatimationScreen"
import { TouchableOpacity } from "react-native"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator() // Create Stack Navigator

function MarketplaceStack() {
  const navigation = useNavigation()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product Details"
        component={ProductDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: "More Details", // Custom title
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "Marketplace") {
              iconName = focused ? "cart" : "cart-outline"
            } else if (route.name === "Farming Advice") {
              iconName = focused ? "leaf" : "leaf-outline"
            } else if (route.name === "Resources") {
              iconName = focused ? "book" : "book-outline"
            } else if (route.name === "Plant Health") {
              iconName = focused ? "scan" : "scan-outline"
            } else if (route.name === "Price Estimation") {
              iconName = focused ? "pricetags" : "pricetags-outline"
            } else if (route.name === "Farm Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: "#4CAF50", // Green for active icons
          tabBarInactiveTintColor: "#888", // Gray for inactive icons
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Marketplace" component={MarketplaceStack} />
        <Tab.Screen name="Price Estimation" component={PriceEstimationScreen} />
        <Tab.Screen name="Farm Profile" component={FarmProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
