import { useEffect, useState } from "react";
import "./App.css";
import { SlMagnifier } from "react-icons/sl";
import { CiLocationOn, CiDroplet } from "react-icons/ci";
import { RiWindyFill } from "react-icons/ri";

const apiKey: string = "1dca3565eb8be9b2cce4d6c0bc068b18";
const apiCountry: string = "https://countryflagsapi.com/png/";

// Interface
interface IWeather {
  city: string;
  temperature: number | null;
  description: string;
  weatherIcon: string;
  country: string;
  umidity: number | null;
  wind: number | null;
}

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
    if (event.key === 'Enter') {
      showWeatherData(search);
    }
  };

  const showWeatherData = async (city: string) => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h3>Pesquisar o clima de uma cidade</h3>
          <div className="form-input-container">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder="Digite a cidade"
            />
            <div className="btnInput">
              <button type="submit" className="btn">
                <SlMagnifier />
              </button>
            </div>
          </div>
        </form>

        <div
          className={!loading ? `weather-data` : "weather-data hide"}
        >
          <h2>
            <CiLocationOn />
            <span id="city">{weatherData.city}</span>
            <img
              src={weatherData.country}
              alt="Bandeira do País"
              crossOrigin="anonymous"
              id="country"
            />
          </h2>
          <p id="temperature">
            <span>{weatherData.temperature}</span>&deg;C
          </p>
          <div id="description-container">
            <p id="description">{weatherData.description}</p>
            <img
              src={weatherData.weatherIcon}
              width="50px"
              height="50px"
              alt="Condições do tempo"
              id="weather-icon"
            ></img>
          </div>

          <div id="details-container">
            <p id="umidity">
              <CiDroplet />
              <span>{weatherData.umidity}%</span>
            </p>
            <p id="windy">
              <RiWindyFill />
              <span>{weatherData.wind} km/h</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
