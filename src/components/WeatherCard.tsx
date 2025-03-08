import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

import { fetchWeather } from '~/api/fetchWeather';

export type cardProps = {
  city: string | null;
};

const WeatherCard = (props: cardProps) => {
  const [data, setData] = useState<any>({});
  const [loading, setloading] = useState<boolean>(true);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    console.log(process.env.EXPO_PUBLIC_WEATHER_MAP_ICON + '/01n_t@4x.png');

    const getWeather = async () => {
      if (props.city) {
        const resp = await fetchWeather(props.city!);
        try {
          setData(resp.data);
          console.log(resp.data);
        } catch (e) {
          setError(e);
          console.log(resp);
        } finally {
          setloading(false);
          console.log('test');
        }
      } else {
        setError('City not found');
        setloading(false);
      }
    };

    getWeather();
  }, [props.city]);

  return loading ? (
    <View>
      <Text>loading</Text>
    </View>
  ) : (
    <View>
      <Text>test</Text>
      <Image src={process.env.EXPO_PUBLIC_WEATHER_MAP_ICON + '/01n@2x.png'} />
    </View>
  );
};

export default WeatherCard;
