import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { Box, IconButton } from "@material-ui/core";
import { generateLocationPUTData } from "../utils";

export default function Update(props) {
  const { handleSubmit, regionName, parentId = 0, level, id, updateRegionAction, setAlertAction } = props;
  let coordinate = JSON.parse(props.coordinate);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(regionName);
  const [longitude, setLongitude] = useState(coordinate[0]);
  const [latitude, setLatitude] = useState(coordinate[1]);

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return (
    <div>
      <IconButton onClick={ handleClickOpen }>
        <EditIcon />
      </IconButton>
      <Dialog open={ open } onClose={ handleClose } aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить регион</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Регион"
            value={ value }
            onChange={ e => setValue(e.target.value) }
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
            />
            <TextField
              style={ { marginLeft: 16 } }
              autoFocus
              margin="dense"
              label="Долгота"
              onChange={ e => setLongitude(e.target.value) }
              value={ longitude }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
            Отмена
          </Button>
          <Button onClick={ () => {
            const data = generateLocationPUTData({ level, value, parentId, longitude, latitude });
            updateRegionAction(id, data);
            handleSubmit();
            setOpen(false);
            setAlertAction('Регион изменен', 'info');

          } } color="primary">
            Подвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
