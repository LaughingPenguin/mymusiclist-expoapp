import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";

import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

const SignUpScreen = ({ navigation }) => {
  // State variables to store user input data
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const toast = useToast();

  // Function to handle form submission for user signup
  const handleSubmit = () => {
    // Validate input data
    if (password !== cpassword) {
      toast.show("password and confirm password must match", {
        type: "danger",
        duration: 2000,
        position: "top",
      });
    } else if (password.length < 10 || password.length > 25) {
      toast.show("password not between 10 and 20 characters", {
        type: "danger",
        duration: 2000,
        position: "top",
      });
    } else if (username.length < 3 || username.length > 20) {
      toast.show("username not between 3 and 20 characters", {
        type: "danger",
        duration: 2000,
        position: "top",
      });
    } else if (!username || !password || !cpassword || !email) {
      toast.show("not all fields are filled", {
        type: "danger",
        duration: 2000,
        position: "top",
      });
    } else {
      // If input data is valid, send a signup request to the server
      axios
        .post(
          "http://YOUR_IP_ADDRESS:8080/index.php/user/signup",
          JSON.stringify({
            username: username,
            email: email,
            password: password,
            cpassword: cpassword,
          })
        )
        .then((response) => {
          // If signup is successful (HTTP status code 201)
          if (response.status === 201) {
            // Clear input fields
            setUsername("");
            setEmail("");
            setPassword("");
            setCpassword("");
            // Show success toast
            toast.show("account created", {
              type: "success",
              duration: 1500,
              position: "top",
            });
            // Navigate to the login screen after a delay
            setTimeout(() => navigation.navigate("login"), 1500);
          }
        })
        .catch((error) => {
          // If an account with the same username already exists (HTTP status code 409)
          if (error.response.status === 409) {
            // Show danger toast and navigate to the login screen after a delay
            toast.show("account already created", {
              type: "danger",
              duration: 1500,
              position: "top",
            });
            setTimeout(() => navigation.navigate("login"), 1500);
          }
          // If signup fails for any other reason
          else {
            // Show danger toast
            toast.show("could not sign up", {
              type: "danger",
              duration: 2000,
              position: "top",
            });
          }
        });
    }
  };

  // Rendered JSX for the signup screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>sign up</Text>
      {/* Input fields for email, username, password, and confirm password */}
      <InputField placeholder="email" value={email} setValue={setEmail} />
      <InputField
        placeholder="username"
        value={username}
        setValue={setUsername}
      />
      <InputField
        placeholder="password"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />
      <InputField
        placeholder="confirm password"
        value={cpassword}
        setValue={setCpassword}
        secureTextEntry
      />
      {/* Button to submit the signup form */}
      <SubmitButton text="sign up" onPress={handleSubmit} />
      {/* Link to navigate to the login screen */}
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={styles.tologin}>
          already have an account? click here to log in!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: "60%",
    paddingBottom: "100%",
    alignItems: "center",
    paddingHorizontal: "15%",
    backgroundColor: "#d7dedc",
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

// Export the SignUpScreen component
export default SignUpScreen;
