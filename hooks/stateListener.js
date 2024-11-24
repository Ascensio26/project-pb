import { useEffect } from "react";
import { AppState } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the import path to match your project setup

const useAppStateListener = (navigation) => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        signOut(auth)
          .then(() => navigation.replace("Login"))
          .catch((error) => console.log("Error signing out:", error));
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => subscription.remove();
  }, [navigation]);
};

export default useAppStateListener;
