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

export default function TextFieldInput({groupName, setGroupName}) {
  const classes = useStyles();

  return (
    <form className={ classes.root } noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Название группы" variant="outlined" value={ groupName } onChange={ (e) => setGroupName(e.target.value) } />
    </form>
  );
}