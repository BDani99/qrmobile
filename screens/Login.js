import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginUser from '../api/loginapi';
import loginImage from '../assets/logo2.png';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await loginUser(email, password);
      console.log('API Válasz:', result);

      if (result.success) {
        console.log('Sikeres bejelentkezés');
  
        const { token, id, admin } = result.data;

        if (token && id) {
          await AsyncStorage.setItem('accessToken', token);
          await AsyncStorage.setItem('userId', id);
          console.log('Token:', token);
          console.log('UserId:', id);
  
          if (admin) {
            console.log('Admin belépés');
          }

        } else {
          console.error('Az accessToken vagy userId értéke undefined vagy null:', token, userId);
          console.log('API válasz:', result);
        }
      } else {
        console.error('Bejelentkezés sikertelen:', result.error);
        console.log('API válasz:', result);
      }
    } catch (error) {
      console.error('Hiba a bejelentkezés során:', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bejelentkezés</Text>
      <Image source={loginImage} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Jelszó"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Bejelentkezés</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },
  image: {
    width: '50%',
    height: '35%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#6AC054',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
