import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../firebase";
import { getDatabase, ref, set, get } from "firebase/database"; // For Firebase Realtime Database

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");
    try {
      if (isSigningUp) {
        // Sign up logic with role
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const db = getDatabase();
        await set(ref(db, `users/${user.uid}`), {
          email: user.email,
          role, // Save the role (e.g., 'driver' or 'user')
        });
        Alert.alert("Sign Up Successful", `Welcome, ${role}!`);
        navigateToRole(role);
      } else {
        // Login logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch role from database
        const db = getDatabase();
        const roleRef = ref(db, `users/${user.uid}/role`);
        const snapshot = await get(roleRef);
        if (snapshot.exists()) {
          const userRole = snapshot.val();
          navigateToRole(userRole);
        } else {
          setError("Role not found. Please contact support.");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const navigateToRole = (userRole) => {
    if (userRole === "driver") {
      navigation.replace("DriverApp");
    } else {
      navigation.replace("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isSigningUp ? "Sign Up" : "Login"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isSigningUp && (
        <TextInput
          style={styles.input}
          placeholder="Role (e.g., user or driver)"
          value={role}
          onChangeText={setRole}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={isSigningUp ? "Sign Up" : "Login"} onPress={handleAuth} />
      <Text
        style={styles.toggle}
        onPress={() => setIsSigningUp((prev) => !prev)}
      >
        {isSigningUp
          ? "Already have an account? Login here."
          : "Don't have an account? Sign up here."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  toggle: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});

export default LoginScreen;
