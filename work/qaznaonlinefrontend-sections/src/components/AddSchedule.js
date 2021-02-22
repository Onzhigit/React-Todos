// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddScheduleTime from './AddScheduleTime';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles((theme) => ({
  inputDayContainer: {
    display: 'flex',
    maxWidth: 320,
    alignItems: 'center'
  },
  timeDayInputContainer: {
    padding: theme.spacing(1),
    border: '1px solid gray',
    borderRadius: '8px',
    marginBottom: theme.spacing(1)
  },
  formControl: {
    display: 'flex',
    margin: theme.spacing(1),
    flex: 0.8,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    display: 'flex',
    flex: 0.2
  },
  schedule: {
    marginRight: 3
  }
}));

function AddSchedule({ schedule, onDaySelected, index, schedules, setSchedule, addTime, handleTimeChange }) {
  const days = [
    'Пондельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
  ];

  const classes = useStyles();

  const handleChange = (event) => {
    onDaySelected(event.target.value, index);
  };
  //console.log(schedule);

  const deleteDay = () => {
    let newArr = schedules.filter((_, idx) => idx !== index);
    setSchedule(newArr);
  };

  return (
    <Grid item xs={ 2 } className={ classes.schedule }>
      <Box className={ classes.timeDayInputContainer }>
        <Box className={ classes.inputDayContainer }>
          <FormControl className={ classes.formControl } key={ schedule.id }>
            <InputLabel id="demo-simple-select-label">День недели</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ schedule.week_day && schedule.week_day }
              onChange={ handleChange }
            >
              { days.map((day, idx) => <MenuItem key={ day } value={ day }>{ day }</MenuItem>) }
            </Select>
          </FormControl>
          <IconButton aria-label="delete" className={ classes.button } onClick={ deleteDay }>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box>
          { schedule.times.map((time, idx) => {
            //console.log(time)
            return (
              <AddScheduleTime key={ idx } handleTimeChange={ handleTimeChange } time={ time } index={ idx } schedule={ schedule } schedules={ schedules } setSchedule={ setSchedule } />
            );
          }) }
          <Button variant="contained" size="small" color="primary" onClick={ addTime }>
            Добавить время
        </Button>
        </Box>
      </Box>
    </Grid>
  );
}

export default AddSchedule;
