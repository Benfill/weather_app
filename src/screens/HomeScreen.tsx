import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { RootStackParamList } from '~/navigation/AppNavigator';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return <View>Home</View>;
};

export default HomeScreen;
