import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SelectRoleRadioButton from './SelectRoleRadioButton';
import SelectDropDown from './SelectDropDown';

import { makeStyles } from '@material-ui/core/styles';
import { DialogContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    alignContent: 'center',
    flexDirection:'column'
  },
}));

export const SelectionDialog = (props) => {
  const classes = useStyles();
  const {
    open,
    setOpenModal,
    chosenRole,
    setChosenRole,
    chosenUsers,
    adminUsersProp,
    updateUsersByRoleAction,
    setChosenUsers,
    roles,
    egovServiceListProps,
    serviceChosen,
    setServiceChosen,
  } = props;

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}>
      <DialogTitle id='simple-dialog-title'>Назначить роль</DialogTitle>
      <DialogContent className={classes.dialog}>
        <SelectDropDown
          label='Услуга'
          services={egovServiceListProps}
          serviceChosen={serviceChosen}
          setServiceChosen={setServiceChosen}
        />
        <SelectRoleRadioButton
          updateUsersByRoleAction={updateUsersByRoleAction}
          adminUsersProp={adminUsersProp}
          chosenUsers={chosenUsers}
          setChosenRole={setChosenRole}
          chosenRole={chosenRole}
          setOpenModal={setOpenModal}
          setChosenUsers={setChosenUsers}
          roles={roles}
          serviceChosen={serviceChosen}
        />
      </DialogContent>
    </Dialog>
  );
};

SelectionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
