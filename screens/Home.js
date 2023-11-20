import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable, PermissionsAndroid, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from 'expo-barcode-scanner';

const Home = () => {
  const navigation = useNavigation();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Kamera Engedély",
            message: "Az alkalmazás kamera használatához engedélyre van szükség.",
            buttonNeutral: "Később",
            buttonNegative: "Mégse",
            buttonPositive: "Engedélyezés"
          }
        );

        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      } catch (error) {
        console.error("Hiba történt a kamera engedélyezése közben:", error);
        setHasPermission(false);
      }
    };

    checkCameraPermission();
  }, []);

  const handleToggleCamera = () => {
    setIsCameraOpen((prev) => !prev);
    setScannedData(null);
  };

  const handleGoBack = () => {
    setIsCameraOpen(false);
    setScannedData(null);
  };

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
    setIsCameraOpen(false); 
    Alert.alert("Beolvasva", "QR-kód sikeresen beolvasva");
    console.log("Qr-kód: " + data)
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Üdvözöljük!</Text>
      <Text>Olvassa be a QR-kódot!</Text>
      <Pressable
        style={styles.button}
        onPress={isCameraOpen ? handleGoBack : handleToggleCamera}
      >
        <Text style={styles.buttonText}>
        {isCameraOpen ? "Bezárás" : "Qr-kód beolvasása"}
        </Text>
      </Pressable>
      {isCameraOpen && (
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.scanner}
          />
          {scannedData && (
            <View style={styles.scannedDataContainer}>
              <Text style={styles.scannedDataText}>{scannedData}</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: "#6AC054",
    padding: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  cameraContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  scannedDataContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  scannedDataText: {
    color: 'white',
    textAlign: 'center',
  },
  scanner: {
    height: '75%',
    marginTop: 150,
  },
});

export default Home;
