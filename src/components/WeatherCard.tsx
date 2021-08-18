import {
  Card,
  Grid,
  Typography,
  Box,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Close, Refresh, WbCloudy } from "@material-ui/icons";
import React from "react";

interface weatherProps {
  name: string;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  humidity: number;
  wind: number;
  date: Date;
  description: string;
  updateCity: (cityName: string) => void;
  deleteCity: (cityName: string) => void;
  errorOccured: boolean;
}
const useStyles = makeStyles((theme) => ({
  cardRoot: {
    width: "fit-content",
  },
  topBox: {
    width: "26rem",
    height: "16rem",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  bottomBox: {
    width: "26rem",
    height: "10rem",
  },
  bottomGrid: {
    height: "100%",
  },
  icon: {
    color: theme.palette.common.white,
  },
}));
export default function WeatherCard({
  name,
  temperature,
  humidity,
  wind,
  date,
  updateCity,
  deleteCity,
  errorOccured,
  description,
  temperatureMin,
  temperatureMax,
}: weatherProps) {
  const classes = useStyles();
  const errorContent = (
    <React.Fragment>
      <Box className={classes.topBox} padding={2}>
        <Grid container direction="column">
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h2">City not found!</Typography>
                  </Grid>

                  <Grid item>
                    <Box alignItems="center">
                      <IconButton
                        size="medium"
                        onClick={() => {
                          deleteCity(name);
                        }}
                      >
                        <Close className={classes.icon} />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.bottomBox} padding={2}></Box>
    </React.Fragment>
  );
  const defaultContent = (
    <React.Fragment>
      <Box className={classes.topBox} padding={2}>
        <Grid container direction="column">
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h2">{name}</Typography>
                  </Grid>

                  <Grid item>
                    <Box alignItems="center">
                      <IconButton
                        size="medium"
                        onClick={() => {
                          updateCity(name);
                        }}
                      >
                        <Refresh className={classes.icon} />
                      </IconButton>
                      <IconButton
                        size="medium"
                        onClick={() => {
                          deleteCity(name);
                        }}
                      >
                        <Close className={classes.icon} />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Typography variant="h4">{description}</Typography>
              </Grid>
              <Grid item>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <WbCloudy />
                  <Box marginLeft={"1.1rem"}>
                    <Typography variant="h4">{wind} m/sec</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Box marginTop="4rem">
              <Typography variant="h1">{temperature}°С</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.bottomBox} padding={2}>
        <Grid
          container
          alignContent="center"
          justifyContent="space-between"
          className={classes.bottomGrid}
        >
          <Grid item>
            <Grid container direction="column" spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="h3">Min</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3">{temperatureMin}°C</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="h3">Max</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3">{temperatureMax}°C</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="h3">Humidity</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3">{humidity}%</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
  return <Card className={classes.cardRoot}>
    {errorOccured?errorContent:defaultContent}
  </Card>;
}
