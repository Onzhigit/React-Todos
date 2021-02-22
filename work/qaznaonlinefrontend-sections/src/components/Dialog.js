import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';


const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 30,
  },
  bckColor: {
    backgroundColor: green[600],
    color: 'white'
  }
}));

export default function DialogComp({ children, buttonName, title, enabledAddButton, buttonConfirmAction, addServicesToOrganizationAction, isDetailedButtonShown, employeeData, serviceButton, employeeButton, service, maxWidth, createTimetableForEmployeeAction, openScheduleEdit = false, setOpenScheduleEdit, setName, setSchedule, setChosenEmp, setKidsAgeGroup, setAgeGroup, setLanguage, setCost, updateTimetableAction, setAlertAction }) {
  //console.log(employeeData && employeeData);
  //console.log(serviceTimetableId);
  const classes = useStyles({ green });

  const [open, setOpen] = useState(false);
  //console.log(openScheduleEdit);
  const [disabled, setDisabled] = useState(true);

  const handleClickOpen = () => {
    if (setOpen) {
      setOpen(true);
    }

    if (setOpenScheduleEdit) {
      setOpenScheduleEdit(true);
    }
  };

  //console.log(employeeData);

  const validateEmployee = () => {
    if (employeeData) {
      const { cost, kids_age_groups_id, kids_groups_id, languages_id, service_timetable_id, sub_sections_id, timetable_time } = employeeData;

      if (cost !== '' && kids_age_groups_id !== '' && kids_groups_id !== '' && service_timetable_id !== '' && sub_sections_id !== '' && timetable_time !== '' && languages_id !== '') {
        return true;
      }
    }
  };

  //validate employee data
  useEffect(() => {
    if (validateEmployee()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeData]);

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
    }

    if (setOpenScheduleEdit) {
      setOpenScheduleEdit(false);
    }
  };

  const saveDataHandle = () => {
    if (addServicesToOrganizationAction) {
      addServicesToOrganizationAction(service);
    }

    if (createTimetableForEmployeeAction) {
      createTimetableForEmployeeAction(employeeData);
      setAlertAction('Расписание добавлено', 'success');
      console.log(employeeData);
      if (setOpenScheduleEdit) {
        setOpenScheduleEdit(false);
      }
    }

    if (updateTimetableAction) {
      updateTimetableAction(employeeData);
      setAlertAction('Расписание обновлено', 'success');
      if (setOpenScheduleEdit) {
        setOpenScheduleEdit(false);
      }
    }
    setOpen(false);
  };

  return (
    <>
      {enabledAddButton ?
        <Button variant="contained" className={ `${classes.button} ${classes.bckColor}` } onClick={ handleClickOpen }>
          { buttonName }
        </Button> : '' }
      {isDetailedButtonShown && (<Button variant="contained" className={ `${classes.button} ${classes.bckColor}` } onClick={ handleClickOpen }>
        { buttonName }
      </Button>) }
      <Dialog
        open={ open || openScheduleEdit }
        onClose={ handleClose }
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth={ maxWidth }
      >
        <DialogTitle id="responsive-dialog-title">{ title }</DialogTitle>
        <DialogContent>
          { children }
        </DialogContent>
        <DialogActions>
          { serviceButton && <Button variant="contained" className={ `${classes.button} ${classes.bckColor}` } onClick={ saveDataHandle } autoFocus>
            { buttonConfirmAction }
          </Button> }
          { employeeButton && <Button variant="contained" className={ `${classes.button} ${classes.bckColor}` } onClick={ saveDataHandle } disabled={ disabled } autoFocus>
            { buttonConfirmAction }
          </Button> }
        </DialogActions>
      </Dialog>
    </>
  );
}