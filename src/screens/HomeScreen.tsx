import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StatusBar } from 'react-native';

import WeatherComonent from '../components/WeatherComponent';

import { RootStackParamList } from '~/navigation/AppNavigator';

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen = ({ route, navigation }: HomeScreenProps) => {
  const [city, setCity] = useState('');
  const cityParam = route.params?.cityParam;

  useEffect(() => {
    if (cityParam) setCity(cityParam);
    else {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const { coords } = await Location.getCurrentPositionAsync({});
        const [address] = await Location.reverseGeocodeAsync(coords);
        setCity(address.city || 'Unknown City');
      })();
    }
  }, []);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View className="flex-1">
        <LinearGradient colors={['#38B4E7', '#4B92E3']} className="flex-1">
          <WeatherComonent city={city} navigation={navigation} />
        </LinearGradient>
      </View>
    </>
  );
};

export default HomeScreen;
