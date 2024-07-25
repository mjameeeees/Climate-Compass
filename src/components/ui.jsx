import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import WeatherForecast from "./forecast";
import axios from "axios";

// Function to get weather information




const Screen = ({city, setCity}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastLoading, setForecastLoading] = useState("");
  const [forecast, setForecast] = useState([]); 

  const apiKey = "68a16f88c3383be25d23ef9016c4d937";


  useEffect(() => {
    setForecast([]);
    // Add a loading state to indicate that the forecast is being fetched
    setForecastLoading(true);

    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          const data = response.data.list;

          // Filter the forecast to include data for the next 4 days
          const fourDayForecast = data.slice(0, 4);

          // Set the forecast state and disable the loading state
          setForecast(fourDayForecast);
          setForecastLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching forecast data:", error);

          // Disable the loading state in case of an error
          setForecastLoading(false);
        });
    }
  }, [city]);

  



  return (
    <div
      className="weather-app"
    >
        
      <Row>
      {forecast.map((forecastItem) => (
    <Col
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: "20px",
        padding: "10px",
        borderRadius: "20px",
        background: "linear-gradient(36deg, rgba(0, 0, 0, 0.5) 30.43%, rgba(255, 118, 118, 0.00) 125.04%)",
        position: "relative",
      }}
    >
      <div style={{ width: "80%", top: "25%", right: "30%" }}>
        <p
          className="text-left"
          style={{
            marginBottom: 0,
            fontSize: "15px",
            fontFamily: "'Roboto', sans-serif",
            color: "#ffffff",
          }}
        >
          Location: {city}
        </p>
        <p
          className="text-left"
          style={{
            marginBottom: 0,
            fontSize: "15px",
            fontFamily: "'Roboto', sans-serif",
            color: "#ffffff",
          }}
        >
          Time: {forecastItem.dt_txt}
        </p>
        <p
          className="text-left"
          style={{
            marginBottom: 0,
            fontSize: "15px",
            fontFamily: "'Roboto', sans-serif",
            color: "#ffffff",
          }}
        >
          Weather Condition: {forecastItem.weather[0].description}
        </p>
        <p
          className="text-left"
          style={{
            marginBottom: 0,
            fontSize: "15px",
            fontFamily: "'Roboto', sans-serif",
            color: "#ffffff",
          }}
        >
          Humidity: {forecastItem.main.humidity}%
        </p>
        <p
          className="text-left"
          style={{
            marginBottom: 0,
            fontSize: "15px",
            fontFamily: "'Roboto', sans-serif",
            color: "#ffffff",
          }}
        >
          Wind Speed: {forecastItem.wind.speed} m/s
        </p>
      </div>
    </Col>
  ))}
      </Row>
      
    </div>
  );
};

export default Screen;

