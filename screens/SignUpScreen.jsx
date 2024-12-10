// SignUpScreen.js

import React, { useState } from "react"
import { TextInput, Button, View, Text } from "react-native"
import { auth } from "./firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigation.navigate("Home") // Redirect to the main dashboard after successful signup
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password:</Text>
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  )
}
