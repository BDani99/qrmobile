import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../../api/me';
import { logoutUser } from '../../api/logout';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const userId = await AsyncStorage.getItem('userId');

        if (accessToken && userId) {
          const userData = await getCurrentUser(accessToken, userId);
          setUserData(userData);
        } else {
          console.error('Nincs elérhető accessToken vagy userId.');
        }
      } catch (error) {
        console.error('Hiba a felhasználói adatok lekérése során:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (accessToken && userId) {
        const success = await logoutUser(userId, accessToken);

        if (success) {
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('userId');
        }
      } else {
        console.error('Nincs elérhető accessToken vagy userId a kijelentkezéshez.');
      }
    } catch (error) {
      console.error('Hiba a kijelentkezés során:', error.message);
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={userData.email} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Név:</Text>
        <TextInput style={styles.input} value={userData.name} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Születési dátum:</Text>
        <TextInput style={styles.input} value={userData.dateOfBirth} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cím:</Text>
        <TextInput style={styles.input} value={userData.address} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Születési hely:</Text>
        <TextInput style={styles.input} value={userData.placeOfBirth} />
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Mentés</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Kijelentkezés</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 10,
    width: '80%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
  },
  saveButton: {
    backgroundColor: '#137d28',
    padding: 12,
    borderRadius: 15,
    marginTop: 20,
    width: '80%'
    },
    saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    },
  logoutButton: {
    backgroundColor: '#e02626',
    padding: 12,
    borderRadius: 15,
    marginTop: 20,
    width: '80%',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserProfile;
