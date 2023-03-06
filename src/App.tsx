// Hooks
import useWeather from "./hooks/useWeather";
// CSS
import "./App.css";
// Components
import Form from "./components/Form";
import WeatherData from "./components/WeatherData";

function App() {
  const {
    handleSubmit,
    search,
    handleSearch,
    handleKeyDown,
    loading,
    weatherData,
    error,
  } = useWeather();

  return (
    <div>
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