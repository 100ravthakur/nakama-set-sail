import { useEffect, useState } from "react";

function WeatherCity({ lat, lon }) {
  const [weather, setWeather] = useState([]);
  const [humadity, setHumadity] = useState([]);
  const [visibilty, setVisibility] = useState([]);
  // const [city, setCity] = useState("pune");
  const [airq, setAirQ] = useState([]);

  const fetchWeather = async () => {
    const getWeatherIcon = (code) => {
      const weatherIcons = {
        0: { condition: "Clear Sky", icon: "☀️" },
        1: { condition: "Mainly Clear", icon: "🌤" },
        2: { condition: "Partly Cloudy", icon: "⛅" },
        3: { condition: "Overcast", icon: "☁️" },
        45: { condition: "Fog", icon: "🌫️" },
        48: { condition: "Depositing Rime Fog", icon: "🌫️❄️" },
        51: { condition: "Light Drizzle", icon: "🌧️" },
        53: { condition: "Moderate Drizzle", icon: "🌧️🌧️" },
        55: { condition: "Heavy Drizzle", icon: "🌧️💦" },
        56: { condition: "Light Freezing Drizzle", icon: "🌧️❄️" },
        57: { condition: "Heavy Freezing Drizzle", icon: "🌧️❄️❄️" },
        61: { condition: "Slight Rain", icon: "🌦️" },
        63: { condition: "Moderate Rain", icon: "🌧️" },
        65: { condition: "Heavy Rain", icon: "🌧️💧💧" },
        66: { condition: "Light Freezing Rain", icon: "🌧️❄️" },
        67: { condition: "Heavy Freezing Rain", icon: "🌧️❄️❄️" },
        71: { condition: "Slight Snowfall", icon: "🌨️" },
        73: { condition: "Moderate Snowfall", icon: "🌨️❄️" },
        75: { condition: "Heavy Snowfall", icon: "❄️❄️🌨️" },
        77: { condition: "Snow Grains", icon: "🌨️🌫️" },
        80: { condition: "Slight Rain Showers", icon: "🌦️" },
        81: { condition: "Moderate Rain Showers", icon: "🌧️🌧️" },
        82: { condition: "Violent Rain Showers", icon: "⛈️💦" },
        85: { condition: "Slight Snow Showers", icon: "🌨️" },
        86: { condition: "Heavy Snow Showers", icon: "❄️❄️🌨️" },
        95: { condition: "Thunderstorm", icon: "⛈️" },
        96: { condition: "Thunderstorm with Slight Hail", icon: "⛈️🌨️" },
        99: { condition: "Thunderstorm with Heavy Hail", icon: "⛈️❄️❄️" },
      };

      return weatherIcons[code] || "❓"; // Default icon if code not found
    };

    try {
      const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=sunrise,sunset,sunset,uv_index_max,precipitation_hours,wind_speed_10m_max&hourly=relative_humidity_2m&minutely_15=visibility,wind_speed_10m,wind_direction_10m&timezone=auto&air_quality=true`;
      const response = await fetch(URL);
      const data = await response.json();

      if (data.current) {
        const weatherDetails = getWeatherIcon(data.current.weather_code);
        setWeather({
          temp: data.current.temperature_2m,
          condition: weatherDetails.condition,
          icon: weatherDetails.icon,
        });
      }
      if (data.hourly) {
        setHumadity({
          humadity: data.hourly.relative_humidity_2m[0],
          // Aqi:data.hourly.european_aqi,

        });
      }
      if (data.minutely_15) {
        setVisibility({
          visible: data.minutely_15.visibility[0],
          windspeed: data.minutely_15.wind_speed_10m
            ? data.minutely_15.wind_speed_10m[0]
            : "N/A",
            winddir:data.minutely_15.wind_direction_10m[0]
        });
      }
      if (data.daily) {
        setAirQ({
          AirQ: data.daily.uv_index_max[0] ?? "N/A",
          sunrise: data.daily.sunrise[0] ?? "N/A",
          sunset: data.daily.sunset[0],
          pre: data.daily.precipitation_hours
            ? data.daily.precipitation_hours[0]
            : "N/A",
        }); // Example air quality data
      }
    } catch (error) {
      console.error("Error While fetching the data", error);
    }
  };
  useEffect(() => {
    fetchWeather();
  }, [lat, lon]);

  function formatData(isoTime) {
    if (!isoTime) {
      return null;
    } else {
      return new Date(isoTime).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    }
  }

  return (
    <div className="Weather-information">
      <h1>{weather.temp ? weather.temp : "na"}°C</h1>
      <h2>
        {weather.condition} {weather.icon}
      </h2>

      <div className="weather-info">
        <div className="right-report">
          <p><img src="/images/weatherlogo/UV.png" alt="uv" /> {airq.AirQ}</p>
         
          <p><img src="/images/weatherlogo/precipitation.png" alt="uv" /> {airq.pre} mm(inch)</p>
          {/* <p>AQI: {humadity.Aqi}</p> */}
          <p>
          <img src="/images/weatherlogo/visible.png" alt="uv" /> {" "}
            {visibilty.visible
              ? (visibilty.visible / 1000).toFixed(1)
              : "loading"} km
          </p>
          <p><img src="/images/weatherlogo/Sunrise.png" alt="uv" /> {formatData(airq.sunrise)}</p>
        </div>
        <div className="left-report">
          <p><img src="/images/weatherlogo/speed.png" alt="uv" /> {visibilty.windspeed} km/h</p>
          <p><img src="/images/weatherlogo/direction.png" alt="uv" /> {visibilty.winddir}°</p>
          <p><img src="/images/weatherlogo/humadity.png" alt="uv" /> {humadity.humadity}%</p>
          <p><img src="/images/weatherlogo/sunset.png" alt="uv" /> {formatData(airq.sunset)}</p>
         
        </div>
      </div>
    </div>
  );
}

export default WeatherCity;
