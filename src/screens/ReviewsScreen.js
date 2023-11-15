import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import Review from "../components/Review";
import SubmitButton from "../components/SubmitButton";
import Modal from "react-native-modal";
import InputField from "../components/InputField";
import Rating from "../components/Rating";

const ReviewsScreen = ({ navigation, route }) => {
  // State variables to store user data and review details
  const [currUser, setCurrUser] = useState(route.params.username);
  const [id, setId] = useState(0);
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState(6);
  const [isModalVisible, setModalVisible] = useState(false);
  const toast = useToast();

  // The set containing the review items
  const [reviewItems, setReviewItems] = useState([]);

  // Function to toggle the visibility of the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to handle star press for rating
  const handleStarPress = (newRating) => {
    setRating(newRating);
  };

  // Fetch and update review items each time the page is loaded
  useEffect(() => {
    axios
      .get("http://YOUR_IP_ADDRESS:8080/index.php/review/read")
      .then((response) => {
        setReviewItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [route]);

  // Function to handle adding a new review
  const handleAddReview = () => {
    const review = {
      username: currUser,
      song: song,
      artist: artist,
      rating: rating,
    };
    setSong("");
    setArtist("");
    setRating(6);
    axios
      .post("http://YOUR_IP_ADDRESS:8080/index.php/review/create", review)
      .then((response) => {
        if (response.status === 200) {
          setReviewItems((prevItems) => [...prevItems, review]);
          toast.show("create successful", {
            type: "success",
            duration: 1500,
            position: "top",
          });
          setId(response.data.id);
          navigation.navigate("reviews", { currUser });
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast.show("you have already created a review for this song", {
            type: "danger",
            duration: 2000,
            position: "top",
          });
        } else {
          toast.show("create failed", {
            type: "danger",
            duration: 2000,
            position: "top",
          });
        }
      });
  };

  // Function to validate the review before adding it
  const validateReview = () => {
    if (song == "" || artist == "" || rating == 6) {
      toast.show("please fill in all fields", {
        type: "danger",
        duration: 2000,
        position: "top",
      });
    } else {
      handleAddReview();
      toggleModal();
    }
  };

  // Function to handle pressing on a review item
  const handleReviewPress = (review) => {
    navigation.navigate("review", { review, currUser });
  };

  // Rendered JSX for the reviews screen
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.user}>You are logged in as: {currUser}</Text>
      <Text style={styles.sectionTitle}>ratings</Text>
      <View style={styles.items}>
        {/* Displaying review items */}
        {reviewItems.map((review) => {
          return (
            <Review
              id={review.id}
              username={review.username}
              song={review.song}
              artist={review.artist}
              rating={review.rating}
              onPress={() => handleReviewPress(review)}
              key={review.id}
            />
          );
        })}
      </View>
      <View style={styles.buttons}>
        {/* Button to open the modal for creating a new review */}
        <SubmitButton text={"create review"} onPress={toggleModal} />
        {/* Modal for creating a new review */}
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.createModal}>
            <Text style={styles.sectionTitle}>create a review</Text>
            <View style={styles.createForm}>
              {/* Input fields for creating a new review */}
              <Text style={styles.inputTitle}>song</Text>
              <InputField placeholder="song" value={song} setValue={setSong} />
              <Text style={styles.inputTitle}>artist</Text>
              <InputField
                placeholder="artist"
                value={artist}
                setValue={setArtist}
              />
              {/* Rating component for selecting the rating */}
              <Rating
                totalStars={5}
                rating={rating}
                onStarPress={handleStarPress}
              />

              {/* Button to create the review */}
              <SubmitButton
                text={"create review"}
                onPress={validateReview}
                style={styles.closeModal}
              />
              {/* Button to close the modal */}
              <SubmitButton
                text={"close"}
                onPress={toggleModal}
                style={styles.closeModal}
              />
            </View>
          </View>
        </Modal>
        {/* Button to exit and navigate to the login screen */}
        <SubmitButton
          text={"exit"}
          onPress={() => {
            navigation.navigate("login");
          }}
        />
      </View>
    </ScrollView>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7dedc",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3E517A",
  },
  items: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  buttons: {
    width: "40%",
  },
  createModal: {
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#d7dedc",
  },
  createForm: {
    width: "70%",
    marginTop: 5,
  },
  inputTitle: {
    paddingLeft: 5,
    color: "#3E517A",
  },
  user: {
    color: "#3E517A",
  },
});

// Export the ReviewsScreen component
export default ReviewsScreen;
