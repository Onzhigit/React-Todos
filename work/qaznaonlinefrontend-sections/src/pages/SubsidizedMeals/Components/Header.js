import React from 'react';
import { Typography } from '@material-ui/core';


function Header({size}) {
  return (
    <Typography variant={size}>
      Заявки
    </Typography>
  );
}

export default Header;
