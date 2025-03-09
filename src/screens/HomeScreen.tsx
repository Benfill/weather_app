import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StatusBar } from 'react-native';

import WeatherComonent from '../components/WeatherComponent';

import { RootStackParamList } from '~/navigation/AppNavigator';

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import Notification from '~/components/Notification';
import { BlurView } from 'expo-blur';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen = ({ route, navigation }: HomeScreenProps) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
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

  // Handle navigation events to close notification
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (showNotification) {
        setShowNotification(false);
      }
    });

    return unsubscribe;
  }, [navigation, showNotification]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View className="flex-1">
        <LinearGradient colors={['#38B4E7', '#4B92E3']} className="flex-1">
          <WeatherComonent
            city={city}
            navigation={navigation}
            setShowNotification={setShowNotification}
          />
        </LinearGradient>
        {showNotification && <BlurView intensity={85} tint="dark" className="absolute inset-0" />}
        {showNotification && <Notification onClose={() => setShowNotification(false)} />}
      </View>
    </>
  );
};

export default HomeScreen;
