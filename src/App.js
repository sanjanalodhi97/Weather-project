import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); 


  const apiKey = "fc983c0c8fb1a7e25e25f12e7074098b"; 

  const fetchWeather = async () => {
  if (!city) return;

  setLoading(true);
  setWeatherData(null);

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod === "404") {
      setWeatherData({ error: "City not found. Please try again." });
    } else {
      setWeatherData(data);
      setCity(""); 
  } catch (err) {
    setWeatherData({ error: "Error fetching data!" });
  }

  setLoading(false);
};


  const getBackgroundColor = () => {
    if (!weatherData || !weatherData.weather) return "#f0f8ff"; // default
    const condition = weatherData.weather[0].main.toLowerCase();

    if (condition.includes("cloud")) return "#dfe6e9";
    if (condition.includes("rain")) return "#a4b0be";
    if (condition.includes("clear")) return "#f9ca24";
    if (condition.includes("snow")) return "#ffffff";
    return "#f0f8ff";
  };

  return (
    <div className="app" style={{ backgroundColor: getBackgroundColor() }}>
      <h1>🌤️ Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather}>Get Weather</button>

      {/* Loading spinner */}
      {loading && <p style={{ marginTop: "10px" }}>Loading...</p>}

      {/* Show error if any */}
      {weatherData && weatherData.error && (
        <p style={{ color: "red", marginTop: "10px" }}>{weatherData.error}</p>
      )}

      {/* Show weather data */}
      {weatherData && weatherData.main && (
        <div className="weather-card">
          <h2>{weatherData.name}</h2>
          <p>🌡 Temp: {weatherData.main.temp} °C</p>
          <p>🌥 Condition: {weatherData.weather[0].description}</p>  
        </div>
      )}
    </div>
  );
};

export default App;
