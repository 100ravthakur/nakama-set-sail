import "./index.css";

import logo1 from "./aasets/images/logo1.png";
import City from "./citymap";
import WeatherCity from "./weather";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCloudMoonRain, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Banner() {
  const [city, setCity] = useState("Pune");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const isLoggedIn = !!localStorage.getItem("token");
  const popupRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchLocation();
    }
  };

  const fetchLocation = async () => {
    try {
      const API_KEY = "b25b0f3900ae9d22025d5f15e3d07027";

      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await fetch(URL);
      const data = await response.json();

      if (data.cod !== 200) {
        return alert("please enter a valid city name");
      }

      setLat(data.coord.lat); // Update lat state
      setLon(data.coord.lon);
    } catch (error) {
      console.error("eror while fetching the API", error);
    }
  };

  const openPop = () => {
    if (popupRef.current) {
      popupRef.current.style.display = "block";
    }
  };
  const closePop = () => {
    if (popupRef.current) {
      popupRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="header-banner">
      <nav className="navbar navbar-expand-lg background-travel">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Chasing Sunsets
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#tripsy">
                  Jorneys
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#memo">
                  Memories
                </a>
              </li>
            </ul>

            {isLoggedIn ? (
              <Link to="/profile">
                <img
                  src={"/images/profile.jpg"}
                  className="w-8 h-8 rounded-full"
                  width={30}
                />
              </Link>
            ) : (
              <>
                {" "}
                <div className="login-btn">
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </div>
              </>
            )}

            <div className="plan">
            <p>Hello</p>
              <p>નમસ્તે</p>
              <p>ਸਤ ਸ੍ਰੀ ਅਕਾਲ</p>
              <p>নমস্কার</p>
              <p>வணக்கம்</p>
              <p>నమస్తే</p>
              <p>ನಮಸ್ಕಾರ</p>
              <p>നമസ്കാരം</p>
              <p>ନମସ୍କାର</p>
              <p>नमस्कार</p>

              <img src="/images/airplan.png" style={{ width: 80 }} />
            </div>

            <div className="travelling">
              <a>
                <img src={logo1} height={80}></img>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div class="popup" id="popup" ref={popupRef}>
        <h1>Weather indicators</h1>

        <p>
          <strong>🌞 UV Index:</strong> 8.45 – A higher UV index means stronger
          sun rays. Use sunscreen if it's above 5!
        </p>
        <p>
          <strong>🌧️ Precipitation:</strong> 1 mm – This shows the amount of
          rain. 1 mm means light rain.
        </p>
        <p>
          <strong>👀 Visibility:</strong> 24.1 km – You can see clearly up to
          this distance.
        </p>
        <p>
          <strong>🌅 Sunrise:</strong> 06:32 AM – The sun rises at this time.
        </p>
        <p>
          <strong>🌇 Sunset:</strong> 06:46 PM – The sun sets at this time.
        </p>
        <p>
          <strong>💨 Wind Speed:</strong> 7.7 km/h – This tells how fast the
          wind is blowing. Stronger wind can make it feel colder.
        </p>
        <p>
          <strong>🧭 Wind Direction:</strong> 259° – The wind is coming from
          this direction (West).
        </p>
        <p>
          <strong>💦 Humidity:</strong> 44% – This shows the amount of moisture
          in the air. Higher humidity makes it feel hotter.
        </p>
        <button class="close-btn" onClick={closePop}>
          Close
        </button>
      </div>

      <div className="banner">
        <div className="travel-row">
          <div className="travel-con about">
            <h1 className="display-1-trip">
              Adventure Awaits
              <br /> Go Find It!
            </h1>
            <p className="lead">
              Travel isn’t just about places; it’s about moments that take your
              breath away. Every journey adds a new story, a fresh perspective,
              and a feeling of freedom. The world is waiting—go explore it!
            </p>
            <div className="quote-t">
              {" "}
              <h3>
                "You weren’t born to just pay bills and die. Pack your bags."
              </h3>
            </div>
          </div>
          <div className="travel-con tmap">
            <City lat={lat} lon={lon} />
          </div>
          <div className="travel-con status">
            <div className="head-pop">
              <h2>Next Destinations?</h2>
              <button className="weather-btn" onClick={openPop}>
                <FaArrowRight style={{ fontSize: "15px" }} />{" "}
                <FaCloudMoonRain />
              </button>
            </div>
            <p>Where are going next for the Adventure</p>
            <div className="journey-row">
              <div className="search-city">
                <button className="btn-search-city" onClick={fetchLocation}>
                  <FaSearch />
                </button>
                <input
                  className="form-city"
                  type="text"
                  placeholder="enter the city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={handleKeyDown}
                ></input>
              </div>
              <div className="journey-right">
                {/* <h2>Weather</h2> */}
                {lat && lon ? (
                  <WeatherCity lat={lat} lon={lon} />
                ) : (
                  <p>Loading location...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
