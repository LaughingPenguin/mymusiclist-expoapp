# mymusiclist_expoapp

**mymusiclist_expoapp** is a simple front-end expo app designed for music enthusiasts to rate songs and share them with others. This repository contains the necessary source code to deploy this application in a local environment. This project uses React Native, and relies on the backend developed in https://github.com/LaughingPenguin/mymusiclist.

## Getting Started

### Prerequisites

Ensure that you have XAMPP, Composer, and npx installed to set up the local backend. Refer to the README in the linked GitHub above to set up the environment for the backend server. Ensure you have Android Studio installed. You can find the latest verison for your device on their official website, https://developer.android.com/studio. The expo app was developed on Android 31 using a Pixel 5.

### Installation

Clone this repo to a local directory and install mymusiclist’s dependencies according to package.json. The project directory should look as follows:

```
|-- root
|   |-- src/
|   |   |-- components/
|   |   |   |-- InputField.js
|   |   |   |-- Rating.js
|   |   |   |-- Review.js
|   |   |   |-- SubmitButton.js
|   |   |-- screens/
|   |   |   |-- LogInScreen.js
|   |   |   |-- ReviewScreen.js
|   |   |   |-- SignUpScreen.js
|   |   |   |-- ViewReviewScreen.js
|   |   |-- App.js
|   |   |-- app.json
|   |   |-- package-lock.json
|   |   |-- package.json
|   | ...
```

### Usage

Follow the instructions in https://github.com/LaughingPenguin/mymusiclist to set up the backend environment. In addition to the instructions from the previous GitHub repo, make sure to change `YOUR_IP_ADDRESS` in the files inside `screens/` to the IP Address of the local environment you are running the code in. Additionally, in `htdocs/controllers/userController.php`, replace `header("Authorization: Bearer " .$jwt);` with

```
header("Authorization: Bearer " .$username);
```

To start mymusiclist_expoapp, run in the root folder `npx expo start`.

## Notice

The star rating that is shown on the app is 6 minus the rating in the database. Due to the ordering of how React Native renders elements, a rating of 5 in the database is actually a rating of 1. Please refer to the number of stars in the app as the correct rating.

## Additional Features

Per the requirements, we implemented react notifications react-native-toast-notifications. On login, signup, creating, updating, and deleting ratings, notifications appear on the top-middle corner of the application after execution. Notification messages change based on the status code of HTTP responses or logic checks.  The setup is simple and explained in the [documentation](https://www.npmjs.com/package/react-native-toast-notifications).

## Authors
* Steven Xu
* Ryan Kobayashi

*Work distribution: 50/50*

---

*This site was designed and published as part of the COMP 333 Software Engineering class at Wesleyan University. This is a training exercise.*
