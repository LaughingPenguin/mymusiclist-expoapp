import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Review from "../components/Review";
import SubmitButton from "../components/SubmitButton";
import Modal from "react-native-modal";
import InputField from "../components/InputField";
import Rating from "../components/Rating";

const ReviewsScreen = ({ navigation, route }) => {
  const username = route.params.username;
  const [id, setId] = useState(0);
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState(6);
  const [isModalVisible, setModalVisible] = useState(false);

  // The set containing the review items
  const [reviewItems, setReviewItems] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleStarPress = (newRating) => {
    setRating(newRating);
  };

  // update the viewed items each time the page is loaded
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

  const handleAddReview = () => {
    const review = {
      username: username,
      song: song,
      artist: artist,
      rating: rating,
    };
    setReviewItems((prevItems) => [...prevItems, review]);
    setSong("");
    setArtist("");
    setRating(6);
    axios
      .post("http://YOUR_IP_ADDRESS:8080/index.php/review/create", review)
      .then((response) => {
        if (response.status === 200) {
          console.log("create successful");
          setId(response.data.id);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          console.log("review already created");
        } else {
          console.log("create failed");
        }
      });
  };

  const validateReview = () => {
    if (song == "" || artist == "" || rating == 6) {
      console.log("please fill in all fields");
    } else {
      handleAddReview();
      toggleModal();
    }
  };

  const handleReviewPress = (review) => {
    const currUser = username;
    navigation.navigate("review", { review, currUser });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>ratings</Text>
      <View style={styles.items}>
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
        <SubmitButton text={"create review"} onPress={toggleModal} />
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.createModal}>
            <Text style={styles.sectionTitle}>create a review</Text>
            <View style={styles.createForm}>
              <Text style={styles.inputTitle}>song</Text>
              <InputField placeholder="song" value={song} setValue={setSong} />
              <Text style={styles.inputTitle}>artist</Text>
              <InputField
                placeholder="artist"
                value={artist}
                setValue={setArtist}
              />
              <Rating
                totalStars={5}
                rating={rating}
                onStarPress={handleStarPress}
              />

              <SubmitButton
                text={"create review"}
                onPress={validateReview}
                style={styles.closeModal}
              />
              <SubmitButton
                text={"close"}
                onPress={toggleModal}
                style={styles.closeModal}
              />
            </View>
          </View>
        </Modal>
        <SubmitButton
          text={"exit"}
          onPress={() => {
            navigation.navigate("login");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

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
});

export default ReviewsScreen;
