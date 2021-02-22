import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DayComponent from './DayComponent'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={ classes.root } { ...other }>
      <Typography variant="h6">{ children }</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={ classes.closeButton } onClick={ onClose }>
          <CloseIcon />
        </IconButton>
      ) : null }
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function CustomizedDialogs({ data }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={ handleClickOpen }>
        Расписание
      </Button>
      <Dialog onClose={ handleClose } aria-labelledby="customized-dialog-title" open={ open }>
        <DialogTitle id="customized-dialog-title" onClose={ handleClose }>
          Расписание инструктора
        </DialogTitle>
        <Grid container className={ classes.root } spacing={ 2 }>
          <Grid item>
            <Grid container justify="center" spacing={ 2 }>
              { data.map((item, index) => (
                <DayComponent itemProp={item} index={index}/>
              )) }
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}