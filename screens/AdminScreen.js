import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updatePassword, updateEmail } from 'firebase/auth';
import { ref, onValue, update, set } from 'firebase/database';
import { db } from '../firebase'; // Your Firebase config

const AdminAccountManagementScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('user'); // Default role for new user

  // Fetching users and checking admin role
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
          const data = snapshot.val();
          const userList = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
          setUsers(userList);
        });

        // Check if current user is an admin
        const userRoleRef = ref(db, `users/${user.uid}/role`);
        onValue(userRoleRef, (roleSnapshot) => {
          const role = roleSnapshot.val();
          setIsAdmin(role === 'admin');
          if (role !== 'admin') {
            navigation.replace('Home'); // Redirect non-admin users
          }
        });
      } else {
        navigation.replace('Login'); // Redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  // Add a new account
  const handleAddAccount = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, newEmail, newPassword);
      const user = userCredential.user;
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, {
        email: newEmail,
        role: newRole,
      });
      Alert.alert('Success', 'User added successfully');
      setNewEmail('');
      setNewPassword('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Update user role
  const handleChangeRole = (userId, newRole) => {
    update(ref(db, `users/${userId}/role`), {
      role: newRole,
    }).then(() => {
      Alert.alert('Success', `Role updated to ${newRole}`);
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  // Edit user email or password
  const handleEditAccount = (userId, newEmail, newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (newEmail) {
      updateEmail(user, newEmail).then(() => {
        const userRef = ref(db, `users/${userId}`);
        update(userRef, {
          email: newEmail,
        }).then(() => {
          Alert.alert('Success', 'Email updated');
        });
      }).catch((error) => {
        Alert.alert('Error', error.message);
      });
    }

    if (newPassword) {
      updatePassword(user, newPassword).then(() => {
        Alert.alert('Success', 'Password updated');
      }).catch((error) => {
        Alert.alert('Error', error.message);
      });
    }
  };

  // Handle logout
  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      navigation.replace('Login');
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage User Accounts</Text>

      {/* Add Account Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={newEmail}
          onChangeText={setNewEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Role (user/driver/admin)"
          value={newRole}
          onChangeText={setNewRole}
        />
        <TouchableOpacity onPress={handleAddAccount} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      {/* Display user list */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.email} - Role: {item.role}</Text>
            {item.id !== currentUser?.uid && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.roleButton, styles.makeDriverButton]}
                  onPress={() => handleChangeRole(item.id, 'driver')}
                >
                  <Text style={styles.buttonText}>Make Driver</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.roleButton, styles.makeAdminButton]}
                  onPress={() => handleChangeRole(item.id, 'admin')}
                >
                  <Text style={styles.buttonText}>Make Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.roleButton, styles.revokeRoleButton]}
                  onPress={() => handleChangeRole(item.id, 'user')}
                >
                  <Text style={styles.buttonText}>Revoke Admin/Driver</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  roleButton: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  makeDriverButton: {
    backgroundColor: '#007bff',
  },
  makeAdminButton: {
    backgroundColor: '#28a745',
  },
  revokeRoleButton: {
    backgroundColor: '#ffc107',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AdminAccountManagementScreen;
