import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextFieldInput from './TextFieldInput';

export default function AddDialog({ openAddDialog, setOpenAddDialog, ageCategory, addGroupToKidsAgeGroupAction, kidsAgeGroupId }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [groupName, setGroupName] = React.useState('');

  const handleClose = () => {
    setOpenAddDialog(false);
    if (addGroupToKidsAgeGroupAction) {
      addGroupToKidsAgeGroupAction(groupName, kidsAgeGroupId)
    }
    setGroupName('')
  };

  //console.log(groupName);

  return (
    <div>
      <Dialog
        fullScreen={ fullScreen }
        open={ openAddDialog }
        onClose={ handleClose }
        aria-labelledby="add-dialog-dialog"
      >
        <DialogTitle id="add-dialog-dialog">{ `Добавьте группу для категории ${ageCategory} лет` }</DialogTitle>
        <DialogContent>
          <TextFieldInput setGroupName={setGroupName} groupName={groupName} />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary" autoFocus>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}