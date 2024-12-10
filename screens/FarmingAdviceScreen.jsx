// FarmingAdviceScreen.js

import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Button } from "react-native"

export default function FarmingAdviceScreen() {
  const [advice, setAdvice] = useState("")

  useEffect(() => {
    // Fetch AI-based or simple farming advice (rule-based for MVP)
    const fetchAdvice = () => {
      setAdvice("Water your crops early in the morning for better growth.")
    }

    fetchAdvice()
  }, [])

  const refreshAdvice = () => {
    // Fetch new advice (for now it's hardcoded for MVP)
    setAdvice("Ensure your crops get enough sunlight for optimal growth.")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Farming Advice</Text>
      <View style={styles.adviceCard}>
        <Text style={styles.adviceText}>{advice}</Text>
      </View>
      <Button title="Get New Advice" onPress={refreshAdvice} color="#4CAF50" />
    </View>
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
  adviceCard: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  adviceText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
})
