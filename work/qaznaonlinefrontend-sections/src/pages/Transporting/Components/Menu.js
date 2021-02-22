import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 60,
    },
  }));

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = makeStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button className={classes.root} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Профайл
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       
        <MenuItem onClick={handleClose}>Кызметтер</MenuItem>
        <MenuItem onClick={handleClose}>Хабарламар</MenuItem>
        <MenuItem onClick={handleClose}>Комек</MenuItem>
        
      </Menu>
    </div>
  );
}
