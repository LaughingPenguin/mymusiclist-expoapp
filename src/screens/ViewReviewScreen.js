import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Rating from "../components/Rating";
import SubmitButton from "../components/SubmitButton";
import Modal from "react-native-modal";

const ViewReviewScreen = ({ navigation, route }) => {
  const { review } = route.params;
  const { id, username, song, artist, rating } = review;

  const [isModalVisible, setModalVisible] = useState(false);
  const [r, setR] = useState(rating);

  const handleStarPress = (newRating) => {
    setR(newRating);
  };

  const handleSubmit = () => {
    setR(r);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>song details</Text>
      <View style={styles.createForm}>
        <Text style={styles.inputTitle}>username</Text>
        <InputField placeholder="username" value={username} editable={false} />
        <Text style={styles.inputTitle}>song</Text>
        <InputField placeholder="song" value={song} editable={false} />
        <Text style={styles.inputTitle}>artist</Text>
        <InputField placeholder="artist" value={artist} editable={false} />
        <Rating totalStars={5} rating={r} onStarPress={() => {}} />
        <SubmitButton
          text={"edit"}
          onPress={toggleModal}
          style={styles.closeModal}
        />
        <SubmitButton
          text={"delete"}
          onPress={() => navigation.navigate("reviews")}
          style={styles.closeModal}
        />
      </View>
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.createModal}>
          <Text style={styles.sectionTitle}>create a review</Text>
          <View style={styles.createForm}>
            <Text style={styles.inputTitle}>song</Text>
            <InputField placeholder="song" value={song} editable={false} />
            <Text style={styles.inputTitle}>artist</Text>
            <InputField placeholder="artist" value={artist} editable={false} />
            <Rating totalStars={5} rating={r} onStarPress={handleStarPress} />

            <SubmitButton
              text={"close"}
              onPress={handleSubmit}
              style={styles.closeModal}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: "40%" },
  createModal: {
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#d7dedc",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3E517A",
  },
  createForm: {
    width: "70%",
    marginTop: 5,
  },
  inputTitle: {
    paddingLeft: 5,
    color: "#3E517A",
  },
});

export default ViewReviewScreen;
