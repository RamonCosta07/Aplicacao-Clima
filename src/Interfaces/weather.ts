export interface IWeather {
  city: string;
  temperature: number | null;
  description: string;
  weatherIcon: string;
  country: string;
  countryName: string;
  umidity: number | null;
  wind: number | null;
}