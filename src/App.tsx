import React from "react";
import WeatherService from "./services/WeatherService";
import Header from "./components/Header";
import CardContainer from "./components/CardContainer";
import { useState } from "react";
import { WeatherInformation } from "./types";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const weatherService = new WeatherService();
  const [cities, setCities] = useState<WeatherInformation[]>([]);
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
    typography: {
      h1: {
        fontSize: "4rem",
      },
      h2: {
        fontSize: "2.5rem",
      },
      h3: {
        fontSize: "1.75rem",
      },
      h4: {
        fontSize: "1rem",
      },
    },
  });

  function handleAddCity(cityName: string) {
    weatherService.getWeather(cityName).then((weather) => {
      const prevCities = [...cities, weather];
      setCities(prevCities);
    });
  }
  function handleDeleteCity(cityName: string) {
    const newCities = cities.filter((city) => city.name !== cityName);
    setCities(newCities);
  }
  function updateCity(cityName: string) {
    const id = cities.findIndex((city) => city.name === cityName);
    weatherService.getWeather(cityName).then((weather) => {
      const newCities = [...cities];
      newCities[id] = weather;
      setCities(newCities);
    });
  }
  function handleDarkMode(){
    setDarkMode(!darkMode);
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header toggleDarkMode={handleDarkMode} />
        <CardContainer
          addCity={handleAddCity}
          deleteCity={handleDeleteCity}
          cities={cities}
          updateCity={updateCity}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
