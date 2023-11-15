import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = () => {
    if (password !== cpassword) {
      console.log("password and confirm password must match");
    } else {
      axios
        .post(
          "http://192.168.4.26:8080/index.php/user/signup",
          JSON.stringify({
            username: username,
            email: email,
            password: password,
            cpassword: cpassword,
          })
        )
        .then((response) => {
          if (response.status === 201) {
            console.log("account created", response);
            navigation.navigate("login");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            console.log("account already exists", error);
            navigation.navigate("login");
          } else {
            console.log("could not sign up", error);
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>sign up</Text>
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
      <Button title="sign up" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={styles.tologin}>
          already have an account? click here to log in!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    margin: 10,
    marginTop: "60%",
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

export default SignUpScreen;
