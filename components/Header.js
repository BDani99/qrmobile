import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, View } from 'react-native';
import { RollInRight } from 'react-native-reanimated';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Pressable onPress={() => navigation.openDrawer()}>
       
      </Pressable>
    </View>
  );
};

export default Header;
