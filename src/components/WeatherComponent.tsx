import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchWeather } from '~/api/fetchWeather';
import { getWeatherCondition } from '~/utils/weatherCondition';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/AppNavigator';

export type cardProps = {
  city: string | null;
  navigation: any;
};

const WeatherComponent = (props: cardProps) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const getWeather = async () => {
      if (props.city) {
        try {
          const resp = await fetchWeather(props.city);
          console.log('API Response:', resp); // Log the response
          setData(resp);
        } catch (e) {
          console.error('Error fetching weather data:', e); // Log the error
          setError(e);
        } finally {
          setLoading(false);
        }
      } else {
        setError('City not found');
        setLoading(false);
      }
    };

    getWeather();
  }, [props.city]);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[today.getMonth()];
    setFormattedDate(`Today, ${day} ${month}`);
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error != null && error.message) {
    return (
      <View>
        <Text>Error: {error.message || 'An error occurred'}</Text>
      </View>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    );
  }

  const tempCelsius = data?.main?.temp ? (data.main.temp - 273.15).toFixed(1) : 'N/A';
  const condition = data?.weather?.[0]
    ? getWeatherCondition(data.weather[0].main, data.weather[0].description)
    : 'N/A';
  const wind = data?.wind?.speed || 'N/A';
  const humidity = data?.main?.humidity || 'N/A';

  return (
    <View className="flex-1 bg-sky-400">
      {/* Location Header */}
      <View className="flex-row items-center justify-between px-5 pt-12">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => props.navigation.navigate('Search')}>
          <Ionicons name="location-outline" size={22} color="white" />
          <Text className="mx-2 text-xl font-semibold text-white">{data.name}</Text>
          <Feather name="chevron-down" size={16} color="white" />
        </TouchableOpacity>
        <Feather name="bell" size={22} color="white" />
      </View>
      <View className="flex h-full gap-40">
        <View>
          {/* Weather Icon */}
          <View className="my-8 items-center">
            <Image
              source={{ uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` }}
              className="h-36 w-36"
              resizeMode="contain"
            />
          </View>

          {/* Weather Card */}
          <View className="mx-5 rounded-3xl bg-white/20 p-5 py-12 backdrop-blur-sm">
            <Text className="text-center text-base text-white">{formattedDate}</Text>

            <View className="my-2 items-center">
              <Text className="text-8xl font-thin text-white">{tempCelsius}°</Text>
            </View>

            <Text className="mb-4 text-center text-2xl font-medium text-white">{condition}</Text>

            <View className="mt-2 flex px-24">
              {/* Wind */}
              <View className="mb-2 flex-row items-center ">
                <Feather name="wind" size={20} color="white" />
                <Text className="ml-2 mr-2 text-base text-white">Wind</Text>
                <Text className="mx-2 text-base text-white">|</Text>
                <Text className="text-base text-white">{wind} km/h</Text>
              </View>

              {/* Humidity */}
              <View className="flex-row items-center ">
                <MaterialCommunityIcons name="water-percent" size={20} color="white" />
                <Text className="ml-2 mr-2 text-base text-white">Hum</Text>
                <Text className="mx-2 text-base text-white">|</Text>
                <Text className="text-base text-white">{humidity} %</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Forecast Button */}
        <View className="mt-8 items-center">
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Details', props.city)}
            className="flex-row items-center rounded-full bg-white px-6 py-4">
            <Text className="mr-2 text-base font-medium text-gray-600">Forecast report</Text>
            <Feather name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WeatherComponent;
