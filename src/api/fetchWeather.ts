import axios from 'axios';

const WEATHER_API = process.env.EXPO_PUBLIC_WEATHER_MAP_API;
const WEATHER_ID = process.env.EXPO_PUBLIC_WEATHER_MAP_APP_ID;

export const fetchWeather = async (city: string) => {
  const response = await axios.get(`${WEATHER_API}?q=${city}&APPID=${WEATHER_ID}`);
  const data = await response.data;
  console.log(data);

  return data;
};

export const fetchForecast = async (city: string) => {
  try {
    // Fetch 5-day/3-hour forecast
    const forecastResponse = await axios.get(process.env.EXPO_PUBLIC_WEATHER_MAP_FORECAST_API, {
      params: {
        q: city,
        appid: process.env.EXPO_PUBLIC_WEATHER_MAP_APP_ID,
      },
    });

    // Fetch 16-day daily forecast
    const dailyForecastResponse = await axios.get(
      process.env.EXPO_PUBLIC_WEATHER_MAP_DAILY_FORECAST_API,
      {
        params: {
          q: city,
          cnt: 7, // Number of days to fetch (max 16)
          appid: process.env.EXPO_PUBLIC_WEATHER_MAP_APP_ID,
        },
      }
    );

    return {
      hourlyForecast: forecastResponse.data.list,
      dailyForecast: dailyForecastResponse.data.list,
    };
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
