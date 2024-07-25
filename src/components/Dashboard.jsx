import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import logo from './weatherlogo.png';
import Image from "react-bootstrap";
import CityInput from "./search";
import WeatherForecast from "./forecast";

import axios from "axios";

const Dashboard = ({city, setCity}) => {
  const [weatherData, setWeatherData] = useState(null);
  
  const [forecast, setForecast] = useState("");

  useEffect(() => {
    

    const apiKey = "68a16f88c3383be25d23ef9016c4d937";

    if (city) {
      // Make the API request to OpenWeatherMap
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          const data = response.data;
          setWeatherData(data);
          console.log("Weather Data:", data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });

      
    }
  }, [city]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  const [greet, setGreet] = useState("");
  const currentTime = new Date();

  useEffect(() => {
    const currentHour = currentTime.getHours();

    if (currentHour >= 0 && currentHour < 12) {
      setGreet("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreet("Good Afternoon");
    } else {
      setGreet("Good Evening");
    }
  }, []);

  return (
    <div>
      <div style={{position: "relative", justifyContent: "center", alignItems:"center",left: "auto", margin: "10px"}}>
      <img src={logo} style={{width: "140px", height: "45px"}} alt="logo" />
</div>
      <Container
      className="my-5 greetings"
      style={{
        width: "80%",
        height: "15rem",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
      }}
    >
      <Row>
        <Col
        className="text-center mx-auto"
        style={{
          margin: "auto",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "bolder",
          fontSize: "25px",
          color: "#ffffff",
        }}
      >
        {greet}
      </Col>
      <Col id="weather_details">
        {weatherData ? (
          <div>
            <p
              className="textDashboard"
             
            >
              Location: {weatherData.name}, {weatherData.sys.country}
            </p>
            <p
              className="textDashboard"
          
            >
              Temperature: {weatherData.main.temp}°C
            </p>
            <p
              className="textDashboard"
             
            >
              Weather Condition: {weatherData.weather[0].description}
            </p>
            <p
              className="textDashboard"
             
            >
              Humidity: {weatherData.main.humidity}%
            </p>
            <p
              className="textDashboard"
             
            >
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
          </div>
        ) : (
          <p
            className="textDashboard"
            
          >
            Loading weather data...
          </p>
        )}
      </Col>
      
      </Row>
    </Container>
    
    </div>
   
  );
  
};

export default Dashboard;
