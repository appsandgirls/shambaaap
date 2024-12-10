// EducationalResourcesScreen.js

import React, { useState } from "react"
import {
  ScrollView,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

export default function EducationalResourcesScreen() {
  const [resources, setResources] = useState([
    {
      title: "Soil Preparation",
      description: "How to prepare your soil for planting.",
    },
    { title: "Pest Control", description: "Effective ways to manage pests." },
    {
      title: "Irrigation Methods",
      description: "Different irrigation techniques for better crop yield.",
    },
    {
      title: "Crop Rotation",
      description: "How crop rotation can improve soil health.",
    },
  ])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Educational Resources</Text>
      {resources.map((resource, index) => (
        <View key={index} style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Text style={styles.resourceDescription}>{resource.description}</Text>
          <TouchableOpacity style={styles.readMoreButton} onPress={() => {}}>
            <Text style={styles.readMoreButtonText}>Read More</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
    textAlign: "center",
  },
  resourceCard: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388E3C",
    marginBottom: 5,
  },
  resourceDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  readMoreButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  readMoreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
