import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchForecast } from '~/api/fetchWeather'; // Import the forecast utility
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/AppNavigator';

// Weather icon components
const WeatherIcon = ({ icon }) => {
  return (
    <Image
      source={{ uri: `${process.env.EXPO_PUBLIC_WEATHER_MAP_ICON}/${icon}@4x.png` }}
      className="h-10 w-10"
      resizeMode="contain"
    />
  );
};

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {
  const { city } = route.params;
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get today's date for the header
  const today = new Date();
  const formattedDate = `Sep. ${today.getDate()}`;

  // Fetch forecast data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { hourlyForecast, dailyForecast } = await fetchForecast(city);

        console.log('Hourly Forecast:', hourlyForecast); // Log hourly forecast data
        console.log('Daily Forecast:', dailyForecast); // Log daily forecast data

        // Process hourly forecast data
        const processedHourly = hourlyForecast.slice(0, 5).map((item) => ({
          time: new Date(item.dt * 1000).getHours() + ':00',
          temp: `${Math.round(item.main.temp - 273.15)}°C`, // Convert Kelvin to Celsius
          icon: item.weather[0].icon,
          isSelected: false,
        }));
        setHourlyForecast(processedHourly);

        // Process daily forecast data
        const processedDaily = dailyForecast.map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          icon: item.weather[0].icon,
          temp: `${Math.round(item.temp.day - 273.15)}°`, // Convert Kelvin to Celsius
        }));
        setDailyForecast(processedDaily);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#38B4E7]">
        <Text className="text-lg text-white">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-[#38B4E7]">
        <Text className="text-lg text-white">Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#38B4E7', '#4B92E3']} className="flex-1">
      <View className="flex-1 pt-12">
        {/* Header */}
        <View className="mb-8 flex-row items-center justify-between px-5">
          <TouchableOpacity className="flex-row items-center" onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color="white" />
            <Text className="ml-1 text-lg text-white">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="settings" size={22} color="white" />
          </TouchableOpacity>
        </View>

        {/* Today's Hourly Forecast */}
        <View className="mb-8 px-5">
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-2xl font-semibold text-white">Today</Text>
            <Text className="text-lg text-white">{formattedDate}</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
            {hourlyForecast.map((item, index) => (
              <View
                key={index}
                className={`mr-3 items-center rounded-2xl px-4 py-3 ${
                  item.isSelected ? 'bg-white/20' : ''
                }`}>
                <Text className="mb-2 text-lg font-medium text-white">{item.temp}</Text>
                <WeatherIcon icon={item.icon} />
                <Text className="mt-2 text-base text-white">{item.time}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Next Forecast */}
        <View className="px-5">
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-2xl font-semibold text-white">Next Forecast</Text>
            <TouchableOpacity>
              <Feather name="calendar" size={22} color="white" />
            </TouchableOpacity>
          </View>

          <View className="mb-3">
            {dailyForecast.map((item, index) => (
              <View key={index} className="mb-6 flex-row items-center justify-between">
                <Text className="text-lg text-white">{item.date}</Text>
                <View className="mx-5 flex-1">
                  <WeatherIcon icon={item.icon} />
                </View>
                <Text className="text-lg text-white">{item.temp}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View className="mb-5 mt-auto flex-row items-center justify-center">
          <Feather name="sun" size={18} color="white" />
          <Text className="ml-2 text-base text-white">AccuWeather</Text>
        </View>
      </View>
    </LinearGradient>
  );
};
export default DetailsScreen;
