import React, { useState, useEffect } from "react";
import axios from "axios";

const apiKey = "68a16f88c3383be25d23ef9016c4d937";

const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [forecastLoading, setForecastLoading] = useState(true);

  useEffect(() => {
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
    <div>
      <h2>Forecast for {city}</h2>

      {forecastLoading ? (
        <div>Loading forecast...</div>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature</th>
              <th>Conditions</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((day) => (
              <tr key={day.dt}>
                <td>{day.dt_txt}</td>
                <td>{day.main.temp} °C</td>
                <td>{day.weather[0].description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Forecast;