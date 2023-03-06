import { useState } from "react";
const apiCountry: string = "https://countryflagsapi.com/png/";
const apiKey: string = "1dca3565eb8be9b2cce4d6c0bc068b18";
// Interface
import { IWeather } from "../Interfaces/weather";

export default function useWeather() {
  const [search, setSearch] = useState<string>("");
  const [weatherData, setWeatherData] = useState<IWeather>({
    city: "",
    temperature: null,
    description: "",
    weatherIcon: "",
    country: "",
    countryName: "",
    umidity: null,
    wind: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getWeatherData = async (city: string) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = search;
    showWeatherData(city);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      showWeatherData(search);
    }
  };

  const showWeatherData = async (city: string) => {
    setLoading(true);
    try {
      const data = await getWeatherData(city);
      setWeatherData({
        ...weatherData,
        city: data.name,
        temperature: parseInt(data.main.temp),
        description: data.weather[0].description,
        weatherIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        country: apiCountry + data.sys.country,
        countryName: data.sys.country,
        umidity: parseInt(data.main.humidity),
        wind: data.wind.speed,
      });
      setError("");
    } catch (error) {
      setError("Cidade informada não existe. Favor realize uma nova busca");
    } finally {
      setLoading(false);
    }
    };
    
    return {
        handleSubmit,
        search,
        handleSearch,
        handleKeyDown,
        loading,
        weatherData,
        error,
    }
};