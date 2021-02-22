import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextFieldInput from './TextFieldInput';

export default function AddDialog({ openDialog, setOpenDialog, ageCategory, addGroupToKidsAgeGroupAction, kidsAgeGroupId, updateGroupOfKidsAgeGroup, groupId, categoryId, typeAction, chosenGroup }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [groupName, setGroupName] = React.useState('');


  React.useEffect(() => {
    setGroupName(chosenGroup.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const handleClose = () => {
    setOpenDialog(false);
    if (groupName !== '') {
      if (typeAction === 'Add') {
        addGroupToKidsAgeGroupAction(groupName, kidsAgeGroupId);
      }
    }
    if (groupName !== '') {
      if (typeAction === 'Edit') {
        updateGroupOfKidsAgeGroup(groupId, groupName, categoryId);
      }
    }
    setGroupName('');
  };

  //console.log(groupName);

  return (
    <div>
      <Dialog
        fullScreen={ fullScreen }
        open={ openDialog }
        onClose={ handleClose }
        aria-labelledby="add-dialog-dialog"
      >
        <DialogTitle id="add-dialog-dialog">{ typeAction === 'Add' ? `Добавьте группу для категории ${ageCategory} лет` : `Измените группу ${chosenGroup.name}` }</DialogTitle>
        <DialogContent>
          <TextFieldInput setGroupName={ setGroupName } groupName={ groupName } />
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