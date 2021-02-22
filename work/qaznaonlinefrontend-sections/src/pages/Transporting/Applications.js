
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainTab from './Components/MainTab';
import Menu from './Components/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 60,
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',

    
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
           <Menu />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <MainTab />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
