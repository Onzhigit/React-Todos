import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    marginTop: '30px',
    backgroundColor:green[500],
    color:'white'
  },
});

export default function FormDialog({
  addUserByRoleAction,
  chosenUsers,
  deleteUserByRoleaction,
  adminUsersProp,
  setChosenUsers,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [company, setCompany] = React.useState('');
  const [name, setName] = React.useState('');
  const [hideButton, setHideButton] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log(chosenUsers);

  React.useEffect(() => {
    if (chosenUsers.length > 0) {
      setHideButton(true);
    } else {
      setHideButton(false);
    }
  }, [chosenUsers]);

  const handleClose = () => {
    if (addUserByRoleAction) {
      const data = {
        name,
        company,
        id: uuidv4(),
        role: 'no-role',
      };
      if (name !== '' && company !== '') {
        addUserByRoleAction(data);
        setCompany('');
        setName('');
      }
      setOpen(false);
    }
  };

  const deleteUsers = () => {
    const result = adminUsersProp.filter(
      (user) => !chosenUsers.some((chosen) => chosen.id === user.id)
    );
    deleteUserByRoleaction(result);
    setChosenUsers({});
  };

  return (
    <div>
      {!hideButton ? (
        <Button
          className={classes.root}
          variant="contained"
          onClick={handleClickOpen}>
          Добавить пользователя
        </Button>
      ) : (
        <Button 
          className={classes.root} 
          onClick={deleteUsers}
          variant="contained"
        >
          Удалить пользователя
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogContent>
          <DialogContentText>Заполните нижеследующие поля</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='company'
            label='Компания'
            type='text'
            fullWidth
            onChange={(e) => setCompany(e.target.value)}
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Имя'
            type='text'
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Отменить
          </Button>
          <Button onClick={handleClose} color='primary'>
            добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
