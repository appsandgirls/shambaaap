import React, { useState } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Linking,
  ScrollView,
} from "react-native"

import mixx from "../assets/mixx.jpg"

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentSuccessful, setPaymentSuccessful] = useState(false)

  const handleBuyButtonPress = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setPaymentSuccessful(true)
    setShowPaymentModal(false)
  }

  const handlePaymentFailure = () => {
    Alert.alert("Payment Failed", "Please try again.")
    setShowPaymentModal(false)
  }



const callFarmer = (phoneNumber) => {
  if (!phoneNumber) {
    Alert.alert("Error", "The phone number is missing or invalid.")
    return
  }

  const url = `tel:${phoneNumber}`

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert(
          "Unsupported",
          "Phone call is not supported on your device."
        )
      } else {
        return Linking.openURL(url)
      }
    })
    .catch((err) => {
      console.error("An error occurred while trying to make a call:", err)
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      )
    })
}



const sendSMS = () => {
  const message = `Hello, ${product.farmerName}. I'm interested in your ${product.productName} on Shamba Marketplace.`
  const url = `sms:${product.phone}?body=${message}`

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        alert("SMS is not supported on your device.")
      } else {
        return Linking.openURL(url)
      }
    })
    .catch((err) => console.error("An error occurred", err))
}

  const renderPaymentModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPaymentModal}
      onRequestClose={() => setShowPaymentModal(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Payment for {product.productName}
          </Text>
          <Text style={styles.modalPrice}>Tsh {product.price}</Text>
          
          <TouchableOpacity
            style={styles.paymentButtonMomo}
            onPress={handlePaymentSuccess}
          >
            <Image source={mixx} style={styles.momo}/>
            <Text style={styles.paymentButtonText}>Pay with Mixx by Yas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={handlePaymentFailure}
          >
            <Text style={styles.paymentButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  const renderContactOptions = () => (
    <View style={styles.contactContainer}>
      <Text style={styles.contactText}>Contact Details</Text>
      <Text style={styles.contactText}>Farmer: {product.farmerName}</Text>
      <Text style={styles.contactPhone}>Phone: {product.phone}</Text>

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => {
          callFarmer(product.phone)
        }}
      >
        <Text style={styles.chatButtonText}>Call Farmer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => {
          sendSMS()
        }}
      >
        <Text style={styles.chatButtonText}>Start Chat</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.productName}</Text>
      <Text style={styles.productPrice}>Tsh {product.price}</Text>
      <Text style={styles.productDescription}>
       {product.desc}
      </Text>

      <TouchableOpacity style={styles.buyButton} onPress={handleBuyButtonPress}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>

      {showPaymentModal && renderPaymentModal()}
      {paymentSuccessful && renderContactOptions()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  momo: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "#388E3C",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputField: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  paymentButtonMomo: {
    backgroundColor: "#F9D908",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  paymentButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  paymentButtonText: {
    color: "#043778",
    fontSize: 16,
    fontWeight: "bold",
  },
  contactContainer: {
    marginVertical: 40,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  contactText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactPhone: {
    fontSize: 16,
    marginBottom: 10,
  },
  chatButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  chatButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
