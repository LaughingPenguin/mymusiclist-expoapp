import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const onSignUpPress = () => {};

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
      <SubmitButton text="sign up" onPress={onSignUpPress} />
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
