import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextFieldInput from './TextFieldInput';

export default function AddDialog({ openDialog, setOpenDialog, setCategory, category, addServiceAction, updateSectionAction, groupId, categoryId, typeAction, chosenGroup, level }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [sectionNameRu, setSectionNameRu] = React.useState('');
  const [sectionNameKk, setSectionNameKk] = React.useState('');

  React.useEffect(() => {
    setSectionNameKk(chosenGroup.section_name_kk);
    setSectionNameRu(chosenGroup.section_name_ru);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, categoryId]);

  const handleSubmit = () => {
    setOpenDialog(false);
    if (sectionNameRu !== '' && sectionNameKk !== '') {
      if (typeAction === 'Add') {
        const data = {
          section_name_kk: sectionNameRu,
          section_name_ru: sectionNameKk,
          sections_id: categoryId
        };
        addServiceAction(data);
        setCategory('');
      }
    }

    if (sectionNameRu !== '' && sectionNameKk !== '') {
      if (typeAction === 'Edit') {
        if (level === 1) {
          const data = {
            section_name_kk: sectionNameRu,
            section_name_ru: sectionNameKk,
            sections_id: categoryId,
            section_type: level
          };
          updateSectionAction(groupId, data);
          setSectionNameRu('');
          setSectionNameKk('');
          setCategory('');
        }
        if (level === 0) {
          const data = {
            section_name_kk: sectionNameRu,
            section_name_ru: sectionNameKk,
            sections_id: categoryId,
            section_type: level
          };
          updateSectionAction(groupId, data);
          setSectionNameRu('');
          setSectionNameKk('');
          setCategory('');
        }
        setCategory('');
      }
    }
    setSectionNameRu('');
    setSectionNameKk('');
    setCategory('');
  };

  const handleClose = () => {
    setOpenDialog(false);
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
        <DialogTitle id="add-dialog-dialog">{ typeAction === 'Add' ? `Добавьте ${category}` : `Измените категорию ${chosenGroup.section_name_kk}` }</DialogTitle>
        <DialogContent>
          <TextFieldInput setValue={ setSectionNameRu } label="Название на Русском" value={ sectionNameRu } />
          <TextFieldInput setValue={ setSectionNameKk } label="Название на Казахском" value={ sectionNameKk } />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleSubmit } color="primary" autoFocus>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}