import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { generateLocationPOSTData } from "../utils";
import { Box } from '@material-ui/core';
//import AddIcon from '@material-ui/icons/Add';

export default function Add(props) {
  const { handleSubmit, level = 0, parentId = 0, addRegionAction, setAlertAction } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [error, showError] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateCoordinate = () => {
    if (/[0-9]/.test(longitude) && /[0-9]/.test(latitude)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!validateCoordinate()) {
      showError('Введите число')
    } else {
      showError('')
    }
  }, [validateCoordinate, latitude, longitude])

  useEffect(() => {
    validateCoordinate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longitude, longitude]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={ open } onClose={ handleClose } aria-labelledby="form-dialog-title" maxWidth={ "sm" } fullWidth>
        <DialogTitle id="form-dialog-title">Добавить регион</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Регион"
            onChange={ e => setValue(e.target.value) }
            value={ value }
            fullWidth
          />
          <Box display={ "flex" }>
            <TextField
              autoFocus
              margin="dense"
              label="Ширина"
              onChange={ e => setLatitude(e.target.value) }
              value={ latitude }
              fullWidth
              helperText={ error }
            />
            <TextField
              style={ { marginLeft: 16 } }
              autoFocus
              margin="dense"
              label="Долгота"
              onChange={ e => setLongitude(e.target.value) }
              value={ longitude }
              fullWidth
              helperText={ error }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
            Отмена
          </Button>
          <Button color="primary" onClick={ e => {
            e.preventDefault();
            const data = generateLocationPOSTData({ level, value, parentId, latitude, longitude });
            addRegionAction(data);
            setAlertAction('Регион добавлен', 'success')
            handleSubmit();
            setOpen(false);
            setValue("");
            setLongitude("");
            setLatitude("");
          } }
            disabled={ !validateCoordinate() }
          >
            Подвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
