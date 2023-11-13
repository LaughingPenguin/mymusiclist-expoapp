import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

const SignInScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    Navigate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>sign up</Text>
      <InputField
        placeholder="email"
        value={formData.email}
        setValue={(value) => handleChange("email", value)}
      />
      <InputField
        placeholder="username"
        value={formData.username}
        setValue={(value) => handleChange("username", value)}
      />
      <InputField
        placeholder="password"
        value={formData.password}
        setValue={(value) => handleChange("password", value)}
        secureTextEntry
      />
      <InputField
        placeholder="confirm password"
        value={formData.cpassword}
        setValue={(value) => handleChange("cpassword", value)}
        secureTextEntry
      />
      <SubmitButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    margin: 10,
    marginTop: "60%",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",

    marginBottom: 10,
    color: "#3E517A",
  },
});

export default SignInScreen;
