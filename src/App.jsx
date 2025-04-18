import React, { useState, useEffect } from "react";
import backgroundImage from "./assets/weather-app-bg.jpg";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Chicago");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found or API error.");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  function capitalizeWords(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  return (
    <div 
        className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4 bg-cover bg-center"
        style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`, 
        }}
    >
      <div className="bg-[#E6ECF0] bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl text-[#1A2526] text-center font-bold mb-4">Weather App</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            placeholder="Enter city name"
          />
          <button
            type="submit"
            className="bg-[#152A66] hover:bg-[#0F1E4D] text-white font-semibold p-2 mt-2 w-full rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "Check Weather"}
          </button>
        </form>

        {error && <p className="text-[#4A1010] font-bold text-center mb-4">{error}</p>}
        {weather && (
          <div className="text-[#1E292A]">
            {/* Add a Label for h2 and make it hidden */}
            <h2 className="font-source text-xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg">
              { Math.round(weather.main.temp * (9/5) + 32) }°F - { capitalizeWords(weather.weather[0].description) }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
