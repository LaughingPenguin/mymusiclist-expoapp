import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./src/screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/LogInScreen";
import ReviewsScreen from "./src/screens/ReviewsScreen";
import CreateReviewScreen from "./src/screens/CreateReviewScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="sign up">
        <Stack.Screen
          name="sign up"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="reviews"
          component={ReviewsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="create review" component={CreateReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7dedc",
    alignItems: "center",
    justifyContent: "top",
  },
});
