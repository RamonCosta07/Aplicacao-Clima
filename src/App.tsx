// React
import { useEffect, useState } from "react";
// CSS
import "./App.css";
// Components
import Form from "./components/Form";
import WeatherData from "./components/WeatherData";
// API
const apiKey: string = "1dca3565eb8be9b2cce4d6c0bc068b18";
const apiCountry: string = "https://countryflagsapi.com/png/";
// Interface
import { IWeather } from "./Interfaces/weather";

function App() {
  const [search, setSearch] = useState<string>("");
  const [weatherData, setWeatherData] = useState<IWeather>({
    city: "",
    temperature: null,
    description: "",
    weatherIcon: "",
    country: "",
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

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="App">
      <div className="container">
        <Form
          handleSubmit={handleSubmit}
          search={search}
          handleSearch={handleSearch}
          handleKeyDown={handleKeyDown}
        />
        <WeatherData
          loading={loading}
          weatherData={weatherData}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
