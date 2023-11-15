import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  // State variables to store email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast hook for displaying alerts
  const toast = useToast();

  // Function to handle form submission
  const handleSubmit = () => {
    axios
      .post(
        // API endpoint for user login
        "http://YOUR_IP_ADDRESS:8080/index.php/user/login",
        // Data to be sent in the request body
        JSON.stringify({
          email: email,
          password: password,
        })
      )
      .then((response) => {
        // If login is successful (HTTP status code 200)
        if (response.status === 200) {
          // Clear email and password fields
          setEmail("");
          setPassword("");
          // Show success toast
          toast.show("login successful", {
            type: "success",
            duration: 1500,
            position: "top",
          });
          // If a JWT token is present in the response headers, navigate to the "reviews" screen
          if (response.headers.authorization) {
            const authorizationHeader = response.headers.authorization;
            const token = authorizationHeader.split("Bearer ")[1];
            // Delayed navigation to "reviews" screen with the username (token)
            setTimeout(
              () => navigation.navigate("reviews", { username: token }),
              1500
            );
          }
        }
      })
      .catch((error) => {
        // If login fails due to incorrect credentials (HTTP status code 401)
        if (error.response.status === 401) {
          // Show danger toast for incorrect credentials
          toast.show("incorrect credentials", {
            type: "danger",
            duration: 2000,
            position: "top",
          });
        }
        // If login fails because the account does not exist (HTTP status code 404)
        else if (error.response.status === 404) {
          // Show danger toast and navigate to the "sign up" screen
          toast.show("account does not exist, please create an account", {
            type: "danger",
            duration: 1500,
            position: "top",
          });
          setTimeout(() => navigation.navigate("sign up"), 1500);
        }
      });
  };

  // Rendered JSX for the login screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>log in</Text>
      {/* Input field for email */}
      <InputField
        placeholder="email"
        value={email}
        setValue={setEmail}
        autoFocus
        required
      />
      {/* Input field for password */}
      <InputField
        placeholder="password"
        value={password}
        setValue={setPassword}
        secureTextEntry
        required
      />
      {/* Button to submit the login form */}
      <SubmitButton text="login" onPress={handleSubmit} />
      {/* Link to navigate to the "sign up" screen */}
      <TouchableOpacity onPress={() => navigation.navigate("sign up")}>
        <Text style={styles.tologin}>
          don't have an account? click here to create one!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    width: "70%",
    margin: 10,
    marginTop: "70%",
    alignItems: "center",
    marginHorizontal: "15%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3E517A",
  },
  tologin: {
    margin: 10,
    fontSize: 13,
    color: "#506186",
  },
});

// Export the LoginScreen component
export default LoginScreen;
