import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Rating from "../components/Rating";
import SubmitButton from "../components/SubmitButton";
import Modal from "react-native-modal";
import axios from "axios";

const ViewReviewScreen = ({ navigation, route }) => {
  const { review, currUser } = route.params;
  const { id, username, song, artist, rating } = review;

  const [isModalVisible, setModalVisible] = useState(false);
  const [r, setR] = useState(rating);

  const handleStarPress = (newRating) => {
    setR(newRating);
  };

  // Updates state to match the update modal
  const handleSubmit = () => {
    setR(r);
    const updatedReview = {
      id: id,
      username: username,
      song: song,
      artist: artist,
      rating: r,
    };
    toggleModal();
    axios
      .put("http://172.21.55.39:8080/index.php/review/update", updatedReview)
      .then((response) => {
        if (response.status === 200) {
          console.log("update successful");
        }
      })
      .catch((error) => {
        console.log("error failed", error);
      });
  };

  // delete handler
  const handleDelete = () => {
    const deleteData = {
      id: id,
      username: username,
      song: song,
      artist: artist,
      rating: r,
    };
    axios
      .delete("http://172.21.55.39:8080/index.php/review/delete", {
        data: deleteData,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("delete success");
          navigation.navigate("reviews", { currUser });
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log("the attempted removed review does not exist");
        } else {
          console.log("delete failed", error);
        }
      });
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

        {currUser === username && (
          <View>
            <SubmitButton text={"edit"} onPress={toggleModal} />
            <SubmitButton text={"delete"} onPress={handleDelete} />
          </View>
        )}
        <SubmitButton
          text={"exit"}
          onPress={() => navigation.navigate("reviews", { currUser })}
          style={styles.exit}
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
