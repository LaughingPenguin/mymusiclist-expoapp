import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const InputField = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  editable,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 40,
    margin: 3,

    borderRadius: 5,
    borderColor: "#CFCFCD",
    borderWidth: 1,

    padding: 10,
  },
  input: {},
});

export default InputField;
