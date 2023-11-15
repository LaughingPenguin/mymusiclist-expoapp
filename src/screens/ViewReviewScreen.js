import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import InputField from "../components/InputField";
import Rating from "../components/Rating";
import SubmitButton from "../components/SubmitButton";
import Modal from "react-native-modal";
import axios from "axios";

const ViewReviewScreen = ({ navigation, route }) => {
  // Extracting review details and current user from route params
  const { review, currUser } = route.params;
  const { id, username, song, artist, rating } = review;

  // State variables for the modal and updated rating
  const [isModalVisible, setModalVisible] = useState(false);
  const [updatedRating, setUpdatedRating] = useState(rating);

  // Toast for displaying messages to the user
  const toast = useToast();

  // Function to handle star press in the rating component
  const handleStarPress = (newRating) => {
    setUpdatedRating(newRating);
  };

  // Function to handle review update
  const handleSubmit = () => {
    // Create an updated review object
    const updatedReview = {
      id: id,
      username: username,
      song: song,
      artist: artist,
      rating: updatedRating,
    };

    // Close the modal
    toggleModal();

    // Send a request to update the review on the server
    axios
      .put("http://YOUR_IP_ADDRESS:8080/index.php/review/update", updatedReview)
      .then((response) => {
        if (response.status === 200) {
          // If update is successful, show success toast
          toast.show("update successful", {
            type: "success",
            duration: 2000,
            position: "top",
          });
        }
      })
      .catch((error) => {
        // If update fails, show danger toast
        toast.show("update failed", {
          type: "danger",
          duration: 2000,
          position: "top",
        });
      });
  };

  // Function to handle review deletion
  const handleDelete = () => {
    // Create a data object for review deletion
    const deleteData = {
      id: id,
      username: username,
      song: song,
      artist: artist,
      rating: updatedRating,
    };

    // Send a request to delete the review on the server
    axios
      .delete("http://YOUR_IP_ADDRESS:8080/index.php/review/delete", {
        data: deleteData,
      })
      .then((response) => {
        if (response.status === 200) {
          // If deletion is successful, show success toast and navigate back to reviews screen
          toast.show("delete successful", {
            type: "success",
            duration: 1500,
            position: "top",
          });
          setTimeout(() => navigation.navigate("reviews", { currUser }), 1500);
        }
      })
      .catch((error) => {
        // If deletion fails due to the review not existing, show a specific danger toast
        if (error.response.status === 404) {
          toast.show("the attempted removed review does not exist", {
            type: "danger",
            duration: 1500,
            position: "top",
          });
        }
        // If deletion fails for any other reason, show a generic danger toast
        else {
          toast.show("delete failed", {
            type: "danger",
            duration: 1500,
            position: "top",
          });
        }
      });
  };

  // Function to toggle the visibility of the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Rendered JSX for the view review screen
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>song details</Text>
      <View style={styles.createForm}>
        {/* Display review details */}
        <Text style={styles.inputTitle}>username</Text>
        <InputField placeholder="username" value={username} editable={false} />
        <Text style={styles.inputTitle}>song</Text>
        <InputField placeholder="song" value={song} editable={false} />
        <Text style={styles.inputTitle}>artist</Text>
        <InputField placeholder="artist" value={artist} editable={false} />
        {/* Display the rating with the ability to edit for the current user */}
        <Rating
          totalStars={5}
          rating={updatedRating}
          onStarPress={handleStarPress}
        />

        {/* Display edit and delete buttons for the current user */}
        {currUser === username && (
          <View>
            <SubmitButton text={"edit"} onPress={toggleModal} />
            <SubmitButton text={"delete"} onPress={handleDelete} />
          </View>
        )}
        {/* Exit button to navigate back to reviews screen */}
        <SubmitButton
          text={"exit"}
          onPress={() => navigation.navigate("reviews", { currUser })}
          style={styles.exit}
        />
      </View>
      {/* Modal for updating the review */}
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.createModal}>
          <Text style={styles.sectionTitle}>edit review</Text>
          <View style={styles.createForm}>
            <Text style={styles.inputTitle}>song</Text>
            <InputField placeholder="song" value={song} editable={false} />
            <Text style={styles.inputTitle}>artist</Text>
            <InputField placeholder="artist" value={artist} editable={false} />
            {/* Rating component for selecting the updated rating */}
            <Rating
              totalStars={5}
              rating={updatedRating}
              onStarPress={handleStarPress}
            />
            {/* Button to close the modal and submit the update */}
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

// Styles for the components
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
  exit: {
    marginTop: 20,
  },
});

// Export the ViewReviewScreen component
export default ViewReviewScreen;
