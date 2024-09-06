// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { TiWeatherWindy } from "react-icons/ti";
import { BsSearch } from "react-icons/bs";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillCloud } from "react-icons/ai";

import "./Weather.css";
import WeatherIcon from "./WeatherIcon";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(""); // Added error state

    async function changeCity() {
        try {
            const apiKey = "823518edc4bac84c6f01daee967901fb";
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`); // More detailed error message
            }

            const data = await response.json();
            setWeatherData(data);
            setError(""); // Clear any previous errors
        } catch (error) {
            console.error("Error fetching weather data:", error); // Detailed error logging
            setWeatherData(null); // Clear previous weather data
            setError("City not found or there was an error fetching data."); // Set a user-friendly error message
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            changeCity();
        }
    }

    return (
        <div className="weatherBlock">
            <div className="cityInput">
                <FaMapMarkerAlt className="locationIcon" />

                <input
                    type="text"
                    placeholder="Enter city"
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyPress}
                />

                <button onClick={changeCity}>
                    <BsSearch />
                </button>
            </div>

            {error && <h1>{error}</h1>} {/* Display error message if any */}

            {weatherData && !error ? (
                <>
                    <div className="cityName">
                        <h2>{weatherData.name}</h2>
                    </div>

                    <div className="weatherIcon">
                        <WeatherIcon weatherData={weatherData} />
                        <p>{weatherData.weather[0].description.toUpperCase()}</p>
                    </div>

                    <div className="weatherInfoBlock">
                        <h1>{(weatherData.main.temp - 273.15).toFixed(0)}°C</h1>
                        <div className="weatherInfo">
                            <p>
                                <TiWeatherWindy />
                                Wind: {weatherData.wind.speed.toFixed(0)} m/s
                            </p>

                            <p>
                                <AiFillCloud />
                                Cloudy: {weatherData.clouds.all}%
                            </p>
                        </div>
                    </div>
                </>
            ) : !error && <h1>Choose the City</h1>} {/* Show placeholder text when no city is selected and no error */}
        </div>
    );
};

export default Weather;