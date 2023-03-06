// CSS
import './WeatherData.css';
// Icons
import { CiLocationOn, CiDroplet } from "react-icons/ci";
import { RiWindyFill } from "react-icons/ri";
// Interfaces
import { IWeather } from "../Interfaces/weather";
type props = {
  loading: boolean;
  weatherData: IWeather;
  error: string;
};

const WeatherData = ({ loading, weatherData, error }: props) => {
  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className={!loading ? `weather-data` : "weather-data hide"}>
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
  );
};

export default WeatherData;
