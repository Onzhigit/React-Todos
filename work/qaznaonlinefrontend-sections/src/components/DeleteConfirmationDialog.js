import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';



function DeleteConfirmationDialog({ openDeleteModal, setOpenDeleteModal, entityName, deleteTimetableByIdAction, scheduleId, setAlertAction }) {

  const deleteEmployee = () => {
    deleteTimetableByIdAction(scheduleId);
    setAlertAction('Расписание удалено', 'info')
    setOpenDeleteModal(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <Dialog open={ openDeleteModal } onClose={ handleCloseDeleteModal } aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{`Удалить ${entityName}`}</DialogTitle>
      <DialogContent>
        <Typography>{`Вы уверены, что хотите удалить ${entityName}?`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleCloseDeleteModal } color="primary">
          Отмена
          </Button>
        <Button color="primary" onClick={ deleteEmployee } aria-label="delete" >
          Подвердить
          </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
