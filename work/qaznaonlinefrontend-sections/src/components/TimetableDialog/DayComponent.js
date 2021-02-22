import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Divider, List, ListItem, Typography } from '@material-ui/core';
import format from 'date-fns/format';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    minHeight: 140,
    minWidth: 140,
    padding: theme.spacing(1)
  }
}));

export default function DayComponent({ itemProp, index }) {
  const classes = useStyles();
  return (
    <Grid key={ index } item>
      <Paper className={ classes.paper }>
        <Typography variant="h6" component="h6">
          { itemProp.week_day }
        </Typography>
        <List component="nav" className={ classes.root } aria-label="mailbox folders">
          { itemProp.times.map((time, idx) => {
            return (
              <div key={ String(idx) + String(index) }>
                <ListItem button>
                  { format(new Date(time.time_start), 'HH:mm') } - { format(new Date(time.time_end), 'HH:mm') }
                </ListItem>
                <Divider />
              </div>
            );
          }) }
        </List>
      </Paper>
    </Grid>
  );
}