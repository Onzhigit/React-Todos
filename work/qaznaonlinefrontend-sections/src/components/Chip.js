import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function ChipComponent({name}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip avatar={<Avatar>M</Avatar>} label={name} />
    </div>
  );
}