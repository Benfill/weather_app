import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, BackHandler, Pressable } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { fetchWeather } from '~/api/fetchWeather'; // Adjust the import path as necessary

interface NotificationProps {
  onClose: () => void;
  city: string;
}

const Notification: React.FC<NotificationProps> = ({ onClose, city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeather(city);
      setWeatherData(data);
    };

    fetchData();
  }, [city]);

  useEffect(() => {
    const backAction = () => {
      onClose();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [onClose]);

  const renderNotification = (weather: any) => {
    if (!weather) return null;

    const { main, description } = weather.weather[0];
    const icon = main === 'Clear' ? 'sunny' : main === 'Clouds' ? 'cloud' : 'cloud-rain';
    const color = main === 'Clear' ? '#FBBF24' : main === 'Clouds' ? '#9CA3AF' : '#3B82F6';

    return (
      <View className="rounded-lg bg-blue-50 p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <View className="pr-2">
              <Ionicons name={icon} size={20} color={color} />
            </View>
            <Text className="flex-1 text-sm text-gray-700">{description}</Text>
          </View>
          <Feather name="chevron-down" size={20} color="#9CA3AF" />
        </View>
        <Text className="mt-1 text-xs text-gray-500">10 minutes ago</Text>
      </View>
    );
  };

  return (
    <Pressable className="absolute inset-0 z-10 flex-1 justify-end" onPress={onClose}>
      <Pressable
        className="w-full space-y-4 rounded-t-3xl bg-white p-4"
        onPress={(e) => e.stopPropagation()}>
        <View className="mb-2 flex-row items-center justify-between border-b border-gray-200 pb-1">
          <Text className="text-lg font-medium text-gray-800">Your notification</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <Text className="text-sm font-medium text-gray-500">New</Text>

        {/* Current Notification */}
        {weatherData && renderNotification(weatherData)}

        {/* Earlier Section */}
        <Text className="mt-4 text-sm font-medium text-gray-500">Earlier</Text>

        {/* Previous Notifications */}
        <ScrollView className="space-y-2" contentContainerStyle={{ gap: 8 }}>
          <View className="rounded-lg bg-gray-50 p-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-2">
                <View className="pr-2">
                  <Feather name="cloud" size={20} color="#9CA3AF" />
                </View>
                <Text className="flex-1 text-sm text-gray-700">
                  A cloudy day will occur all day long, don't worry about the heat of the sun
                </Text>
              </View>
              <Feather name="chevron-down" size={20} color="#9CA3AF" />
            </View>
            <Text className="mt-1 text-xs text-gray-500">1 day ago</Text>
          </View>

          <View className="rounded-lg bg-gray-50 p-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-2">
                <View className="pr-2">
                  <Feather name="cloud-rain" size={20} color="#3B82F6" />
                </View>
                <Text className="flex-1 text-sm text-gray-700">
                  Potential for rain today is 84%, don't forget to bring your umbrella
                </Text>
              </View>
              <Feather name="chevron-down" size={20} color="#9CA3AF" />
            </View>
            <Text className="mt-1 text-xs text-gray-500">2 days ago</Text>
          </View>
        </ScrollView>
      </Pressable>
    </Pressable>
  );
};

export default Notification;
