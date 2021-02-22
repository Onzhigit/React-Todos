import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton, Typography } from "@material-ui/core";
import { useHistory } from 'react-router-dom';


export default function Remove(props) {
  const history = useHistory();
  const { handleSubmit, regionId, deleteRegionAction, level = 0, setAlertAction } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={ handleClickOpen }>
        <ClearIcon />
      </IconButton>
      <Dialog open={ open } onClose={ handleClose } aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Удалить регион</DialogTitle>
        <DialogContent>
          <Typography> Вы уверены, что хотите удалить регион?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
            Отмена
          </Button>
          <Button onClick={ (e) => {
            e.preventDefault();
            deleteRegionAction(regionId, level, history);
            handleSubmit(regionId);
            setOpen(false);
            setAlertAction('Регион удален', 'warning');
          } } color="primary">
            Подвердить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
