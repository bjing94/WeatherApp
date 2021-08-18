import React from "react";
import WeatherCard from "./WeatherCard";
import { Box, Grid, Toolbar, useMediaQuery, useTheme } from "@material-ui/core";
import AddWeatherCard from "./AddWeatherCard";
import { WeatherInformation } from "../types";
interface cardContainerProps {
  addCity: (cityName: string) => void;
  updateCity: (cityName: string) => void;
  deleteCity: (cityName: string) => void;
  cities: WeatherInformation[];
}

export default function CardContainer({
  addCity,
  deleteCity,
  cities,
  updateCity,
}: cardContainerProps) {
  const elements = cities.map((city) => {
    return (
      <Grid item>
        <WeatherCard
          name={city.name}
          temperature={city.temperature}
          temperatureMin={city.temperatureMin}
          temperatureMax={city.temperatureMax}
          date={city.date}
          updateCity={updateCity}
          deleteCity={deleteCity}
          errorOccured={city.errorOccured}
          description={city.description}
          humidity={city.humidity}
          wind={city.wind}
        />
      </Grid>
    );
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box m={2}>
      <Toolbar />
      {matches && (
        <Grid container spacing={2}>
          {elements}

          <Grid item>
            <AddWeatherCard addCity={addCity} />
          </Grid>
        </Grid>
      )}
      {!matches && (
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {elements}

          <Grid item>
            <AddWeatherCard addCity={addCity} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
