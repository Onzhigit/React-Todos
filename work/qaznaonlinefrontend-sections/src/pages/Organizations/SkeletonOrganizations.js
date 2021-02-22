import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '60%',
    margin:'0 auto'
  },
});

export default function Animations() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton varian="rect" animation="wave" width={'100%'} height={100} />
      <Skeleton varian="block" animation="wave" width={'100%'} height={100} />
      <Skeleton varian="block" animation="wave" width={'100%'} height={100} />
      <Skeleton varian="block" animation="wave" width={'100%'} height={100} />
      <Skeleton varian="block" animation="wave" width={'100%'} height={100} />
      <Skeleton varian="block" animation="wave" width={'100%'} height={100} />
    </div>
  );
}