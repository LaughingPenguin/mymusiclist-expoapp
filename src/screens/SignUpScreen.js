import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

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
      <SubmitButton />
      <TouchableOpacity>
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
