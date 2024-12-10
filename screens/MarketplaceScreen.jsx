import React, { useState, useEffect } from "react"
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function MarketplaceScreen() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    // Simulating loading state while fetching data
    setTimeout(() => {
      setProducts([
        {
          id: "1",
          productName: "Maize (50kg Bag)",
          price: 55000,
          image:
            "https://app.selinawamucii.com/produce_images/large/TZ-245-117829-5913_PSX_20220828_220710_1723194496.jpg",
          phone: 255672232334,
          farmerName: "John Mkude",
          minOrder: 1000,
          desc: "The Product is Fortied and verified by Tanzania Bureau of Standards(TBS) a government-powered organization to delivers quality products and services on standardization, safety management, conformity assessment, and metrology by meeting legal and customer requirements and even exceeding customers' expectations to retain their loyalty.",
        },
        {
          id: "2",
          productName: "Rice (50kg Bag)",
          price: 95000,
          image:
            "data:image/jpeg;base64,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",
          phone: 255756604000,
          farmerName: "Joshua Kyando",
          minOrder: 500,
          desc: "The Product is Fortied and verified by Tanzania Bureau of Standards(TBS) a government-powered organization to delivers quality products and services on standardization, safety management, conformity assessment, and metrology by meeting legal and customer requirements and even exceeding customers' expectations to retain their loyalty.",
        },
        // Add more products as needed...
      ])
      setLoading(false)
    }, 2000) // Simulating a 2-second data load
  }, [])

  const handleProductPress = (product) => {
    navigation.navigate("Product Details", { product })
  }

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productPrice}>Tsh {item.price} per kg</Text>
        <Text style={styles.productName}>Min Order {item.minOrder}Kg</Text>
        <TouchableOpacity
          style={styles.productDetailsButton}
          onPress={() => handleProductPress(item)}
        >
          <Text style={styles.productDetailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shamba Market</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#4CAF50",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  productCard: {
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#388E3C",
    marginBottom: 10,
  },
  productDetailsButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  productDetailsButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
