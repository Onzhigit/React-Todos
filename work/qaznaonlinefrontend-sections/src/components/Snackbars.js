import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';


export default function PositionedSnackbar({ data }) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  //console.log(data);

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Button onClick={ handleClick({ vertical: 'top', horizontal: 'center' }) }>{ data.area2_name }</Button>
    </React.Fragment>
  );

  return (
    <div>
      {buttons }
      <Snackbar
        anchorOrigin={ { vertical, horizontal } }
        open={ open }
        onClose={ handleClose }
        message={ `Координаты ${data.area2_name} ${data.coordinate}` }
        key={ vertical + horizontal }
      />
    </div>
  );
}