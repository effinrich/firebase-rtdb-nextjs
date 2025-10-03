
import axios from "axios";
import { WeatherResponse } from "@/types/user";

const WEATHER_API_KEY = "7afa46f2e91768e7eeeb9001ce40de19";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherData = async (zipCode: string): Promise<WeatherResponse> => {
  const response = await axios.get(WEATHER_BASE_URL, {
    params: {
      zip: zipCode,
      appid: WEATHER_API_KEY,
    },
  });
  return response.data;
};
