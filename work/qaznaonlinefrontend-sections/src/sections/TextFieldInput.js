import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}));

export default function TextFieldInput({value, setValue, label}) {
  const classes = useStyles();

  return (
    <form className={ classes.root } noValidate autoComplete="off">
      <TextField id="outlined-basic" label={label} variant="outlined" value={ value } onChange={ (e) => setValue(e.target.value) } />
    </form>
  );
}