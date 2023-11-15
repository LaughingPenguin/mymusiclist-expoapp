import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://YOUR_IP_ADDRESS:8080/index.php/user/login",
      JSON.stringify({
        email: email,
        password: password,
      }))
      .then((response) => {
        if (response.status === 200) {
          console.log("login successful", response)
          if (response.headers.authorization) {
            const authorizationHeader = response.headers.authorization;
            const token = authorizationHeader.split('Bearer ')[1];
            navigation.navigate("reviews", { username: token });
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log('incorrect credentials')
        } else if (error.response.status === 404) {
          console.log('account does not exist', error);
          navigation.navigate('sign up');
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
      <SubmitButton text="login" onPress={handSubmit} />
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
