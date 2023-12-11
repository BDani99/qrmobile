import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  PermissionsAndroid,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import validateQRCode from '../api/qr';

const Home = () => {
  const navigation = useNavigation();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [manualInputVisible, setManualInputVisible] = useState(false);
  const [manualInput, setManualInput] = useState("");

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

  const handleBarCodeScanned = async ({ data }) => {
    try {
      await validateQRCode(data);
      setScannedData(data);
      setIsCameraOpen(false); 
      console.log("Qr-kód: " + data);
    } catch (error) {
      console.error("Hiba történt a QR-kód validálása közben:", error);
    }
  };

  const handleManualInput = async () => {
    setIsCameraOpen(false);
    setManualInputVisible(true);
  };

  const handleConfirmManualInput = async () => {
    try {
      await validateQRCode(manualInput);
      setManualInputVisible(false);
    } catch (error) {
      console.error("Hiba történt a QR-kód validálása közben:", error);
    }
  };
  

  const handleCancelManualInput = () => {
    setManualInputVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Üdvözöljük!</Text>
      <Text>Olvassa be a QR-kódot vagy használja a kézi bevitelt!</Text>
      <Pressable
        style={styles.button}
        onPress={handleManualInput}
      >
        <Text style={styles.buttonText}>
          Kézi bevitel
        </Text>
      </Pressable>
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
      <Modal
        visible={manualInputVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Írja be a QR kódot"
              onChangeText={(text) => setManualInput(text)}
              value={manualInput}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: '#e02626' }]}
                onPress={handleCancelManualInput}
              >
                <Text style={styles.buttonText}>Mégse</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: '#137d28' }]}
                onPress={handleConfirmManualInput}
              >
                <Text style={styles.buttonText}>Megerősít</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "start",
    marginTop: 10,
    paddingHorizontal: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#367a5f",
    padding: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  cameraContainer: {
    flex: 1,
    marginTop: 80,
    height: '94%',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  confirmButton: {
    width: '36%',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Home;
