import { useNavigation } from "@react-navigation/native";
import { Button, SafeAreaView, Text, View } from "react-native";

export default function Settings() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>Settings</Text>
    </SafeAreaView>
  );
}