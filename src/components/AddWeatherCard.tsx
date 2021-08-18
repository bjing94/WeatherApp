import {
  makeStyles,
  Card,
  CardContent,
  IconButton,
  Box,
  Typography,
  Input,
  Button,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { useRef } from "react";

interface addCardProps {
  addCity: (cityName: string) => void;
}

const useStyles = makeStyles({
  cardRoot: {
    width: "18rem",
    height: "26rem",
  },
  addButton: {
    width: "8rem",
    height: "8rem",
  },
  addIcon: {
    width: "4rem",
    height: "4rem",
  },
  cardContent: {
    height: "100%",
  },
});
export default function AddWeatherCard({ addCity }: addCardProps) {
  const classes = useStyles();
  const [showInput, setShowInput] = useState(false);
  const inputEl = useRef<any>();

  return (
    <Card className={classes.cardRoot}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{ height: "100%", width: "100%" }}
          flexDirection="column"
        >
          {showInput && (
            <React.Fragment>
              <Input
                inputRef={inputEl}
                type="text"
                placeholder="Enter city name"
              />
              <Box marginTop={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setShowInput(false);
                    addCity(inputEl.current.value);
                  }}
                >
                  Add
                </Button>
              </Box>
            </React.Fragment>
          )}
          {!showInput && (
            <React.Fragment>
              <Box marginTop={"4rem"}>
                <IconButton
                  className={classes.addButton}
                  onClick={() => {
                    setShowInput(true);
                  }}
                >
                  <Add className={classes.addIcon}   />
                </IconButton>
              </Box>
              <Box marginTop={"4rem"}>
                <Typography variant="h5">Add city</Typography>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
