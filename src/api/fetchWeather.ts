import axios from "axios";

const WEATHER_API = process.env.EXPO_PUBLIC_WEATHER_MAP_API;
const WEATHER_ID = process.env.EXPO_PUBLIC_WEATHER_MAP_APP_ID;

export const fetchWeather = async (city:string) => {
  return await axios.get(`${WEATHER_API}?q=${city}&APPID=${WEATHER_ID}`);
}