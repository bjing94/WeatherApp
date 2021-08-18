import {
  AppBar,
  FormControlLabel,
  Grid,
  Switch,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";

interface HeaderProps{
    toggleDarkMode: ()=>void;
}
export default function Header({toggleDarkMode}:HeaderProps) {
  return (
    <div>
      <AppBar color="default">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography>Weather APP</Typography>
            </Grid>

            <Grid item>
              <FormControlLabel control={<Switch onClick={toggleDarkMode}/>} label="Night mode" color="secondary"/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
