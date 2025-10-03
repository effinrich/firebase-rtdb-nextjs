
export interface User {
  id: string;
  name: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  timezone: number;
}

export interface UserFormData {
  name: string;
  zipCode: string;
}

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  timezone: number;
}
