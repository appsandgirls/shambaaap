import React, { useState } from "react"
import {
  TextInput,
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native"
import { db } from "../firebase"
import { setDoc, doc } from "firebase/firestore"

export default function FarmProfileScreen() {
  const [farmName, setFarmName] = useState("")
  const [farmSize, setFarmSize] = useState("")
  const [cropType, setCropType] = useState("")

  const saveFarmProfile = async () => {
    const userId = "user-id" // Get user ID from Firebase auth
    try {
      await setDoc(doc(db, "farms", userId), {
        farmName,
        farmSize,
        cropType,
      })
      alert("Farm profile saved!")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Farm Profile</Text>

        <Text style={styles.label}>Farm Name:</Text>
        <TextInput
          style={styles.input}
          value={farmName}
          onChangeText={setFarmName}
          placeholder="Enter farm name"
        />

        <Text style={styles.label}>Farm Size (Acres):</Text>
        <TextInput
          style={styles.input}
          value={farmSize}
          onChangeText={setFarmSize}
          placeholder="Enter farm size"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Crop Type:</Text>
        <TextInput
          style={styles.input}
          value={cropType}
          onChangeText={setCropType}
          placeholder="Enter crop type"
        />

        <Button
          title="Save Profile"
          onPress={saveFarmProfile}
          color="#4CAF50"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4CAF50",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 15,
    color: "#333",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
})
