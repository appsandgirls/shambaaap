// PlantHealthDetectorScreen.js

import React, { useState } from "react"
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import * as ImagePicker from "expo-image-picker"

export default function PlantHealthDetectorScreen() {
  const [image, setImage] = useState(null)
  const [diagnosis, setDiagnosis] = useState(null)
  const [loading, setLoading] = useState(false)

  // Function to launch the image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
      setDiagnosis(null) // Reset diagnosis on new image
      setLoading(true) // Start loading spinner
      analyzePlantHealth(result.uri) // Start analysis
    }
  }

  // Function to analyze plant health using a mock API or image recognition logic
  const analyzePlantHealth = async (imageUri) => {
    // Simulate an API call for plant health analysis (mock)
    setTimeout(() => {
      setDiagnosis({
        message: "No pests or diseases detected. Your plant looks healthy!",
        type: "Healthy", // This could be "Healthy", "Pests", "Diseases", etc.
      })
      setLoading(false) // Stop loading spinner
    }, 3000) // Simulate a 3-second analysis
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant Health Detector</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image from Gallery</Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : (
        diagnosis && (
          <View style={styles.diagnosisCard}>
            <Text style={styles.diagnosisTitle}>
              {diagnosis.type === "Healthy"
                ? "🌿 Healthy Plant"
                : "⚠️ Attention Needed"}
            </Text>
            <Text style={styles.diagnosisText}>{diagnosis.message}</Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8f4",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#388E3C",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
  loader: {
    marginTop: 20,
  },
  diagnosisCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4CAF50",
    width: "90%",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  diagnosisTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388E3C",
    marginBottom: 10,
  },
  diagnosisText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  learnMoreButton: {
    backgroundColor: "#388E3C",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  learnMoreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
