import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const validateQRCode = async (qrcode) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log("token: " + accessToken)

    if (!accessToken) {
      console.error('Hiba: Hozzáférési token nincs meg.');
      return;
    }

    const apiUrl = 'http://10.0.2.2:5000/qrcode';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ qrcode }),
    });

    const responseData = await response.json();

    console.log('API válasz:', responseData);

    if (responseData.message) {
      console.log(responseData.message);
      Alert.alert(responseData.message);
    } else {
      console.error('Hiba: Nem sikerült érvényesíteni a jegyet.');
    }
  } catch (error) {
    console.error('QR kód érvényesítése sikertelen', error);
    console.error('Hiba: Nem sikerült érvényesíteni a jegyet.');
  }
};

export default validateQRCode;
