import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";

import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (password !== cpassword) {
      toast.show('password and confirm password must match', { type: 'danger', duration: 2000, position: 'top' });
    } else if (password.length < 10 || password.length > 25) {
      toast.show('password not between 10 and 20 characters', { type: 'danger', duration: 2000, position: 'top' });
    } else if (username.length < 3 || username.length > 20) {
      toast.show('username not between 3 and 20 characters', { type: 'danger', duration: 2000, position: 'top' });
    } else if (!username || !password || !cpassword || !email) {
      toast.show('not all fields are filled', { type: 'danger', duration: 2000, position: 'top' });
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
            toast.show('account created', { type: 'success', duration: 1500, position: 'top' });
            setTimeout(() => navigation.navigate("login"), 1500);
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            toast.show('account already created', { type: 'danger', duration: 1500, position: 'top' });
            setTimeout(() => navigation.navigate("login"), 1500);
          } else {
            toast.show('could not sign up', { type: 'danger', duration: 2000, position: 'top' });
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
      <SubmitButton text="sign up" onPress={handleSubmit} />
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

export default SignUpScreen;
