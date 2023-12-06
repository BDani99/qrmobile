import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './Navigation';
import LoginScreen from './screens/Login';

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('accessToken');
        setToken(storedToken);
      } catch (error) {
        console.error('Hiba a token ellenőrzésekor:', error);
      }
    };

    const tokenCheckInterval = setInterval(() => {
      checkToken();
    }, 1000);

    return () => clearInterval(tokenCheckInterval);
  }, []);

  return token ? <Navigation /> : <LoginScreen />;
}
