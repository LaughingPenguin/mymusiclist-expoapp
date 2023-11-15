import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    axios
      .post(
        "http://YOUR_IP_ADDRESS/index.php/user/login",
        JSON.stringify({
          email: email,
          password: password,
        })
      )
      .then((response) => {
        if (response.status === 200) {
          toast.show("login successful", {
            type: "success",
            duration: 1500,
            position: "top",
          });
          if (response.headers.authorization) {
            const authorizationHeader = response.headers.authorization;
            const token = authorizationHeader.split("Bearer ")[1];
            setTimeout(
              () => navigation.navigate("reviews", { username: token }),
              1500
            );
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.show("incorrect credentials", {
            type: "danger",
            duration: 2000,
            position: "top",
          });
        } else if (error.response.status === 404) {
          toast.show("account does not exist, please create an account", {
            type: "danger",
            duration: 1500,
            position: "top",
          });
          setTimeout(() => navigation.navigate("sign up"), 1500);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>log in</Text>
      <InputField
        placeholder="email"
        value={email}
        setValue={setEmail}
        autoFocus
        required
      />
      <InputField
        placeholder="password"
        value={password}
        setValue={setPassword}
        secureTextEntry
        required
      />
      <SubmitButton text="login" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate("sign up")}>
        <Text style={styles.tologin}>
          don't have an account? click here to create one!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default LoginScreen;
