import 'date-fns';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  inputDayContainer: {
    display: 'flex',
    maxWidth: 320,
    alignItems: 'center'
  },
  timeContainer: {
    padding: theme.spacing(1),
    border: '1px solid gray',
    borderRadius: 8,
    marginBottom: 3
  }
}));

export default function ScheduleTime({ time, handleTimeChange, schedule, setSchedule, index }) {
  const { time_start, time_end } = time;
  const classes = useStyles();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);



  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const deleteTime = (idx) => {
    console.log('dleeting index', index);
    //console.log(schedule);
    setSchedule((prevState) => prevState.map((item, index) => {
      console.log(item, schedule);
      if (index === idx) {
        item.times.splice(index, 1);
      }
      return item;
    }));
  };

  useLayoutEffect(() => {
    if (time_start && time_end) {
      setSelectedStartDate(time_start);
      setSelectedEndDate(time_end);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log({selectedStartDate})
    handleTimeChange(index, 'start', selectedStartDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDate]);

  useEffect(() => {
    handleTimeChange(index, 'end', selectedEndDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEndDate]);

  return (
    // <Grid item xs={ 3 }>


    <MuiPickersUtilsProvider utils={ DateFnsUtils }>
      <Box className={ classes.timeContainer }>

        <IconButton aria-label="delete" className={ classes.button } onClick={ () => deleteTime(index) }>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <KeyboardTimePicker
          margin="normal"
          id="time-start"
          label="Начинается"
          ampm={ false }
          value={ selectedStartDate }
          onChange={ handleStartDateChange }
          KeyboardButtonProps={ {
            'aria-label': 'change time',
          } }
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-end"
          label="Заканчивается"
          ampm={ false }
          value={ selectedEndDate }
          onChange={ handleEndDateChange }
          KeyboardButtonProps={ {
            'aria-label': 'change time',
          } }
        />
      </Box>
    </MuiPickersUtilsProvider>
    // </Grid>
  );
}