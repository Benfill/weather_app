import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_WEATHER_MAP_API;
const KEY = process.env.EXPO_PUBLIC_WEATHER_MAP_APP_ID;

export const fetchWeather = async (city:string) => {
  return await axios.get(BASE_URL!, {
    params: {
      q: city,
      APPID: KEY,
      units: 'metric',
    }
  });
}