import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 650,
    margin: '0 auto'
  },
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  }

}));

function createData(name, fat) {
  return {
    name,
    fat
  };
}

function OragnizationsTable({
  organization,
  id,
  selectedId,
  languages,
  //ownerships,
  //schedules,
  setOrganizationIsEdited,
  organizationIsEdited,
  deleteOrganizationAction,
  setAlertAction
}) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [companyName, setCompanyName] = useState('');
  //const [formOfOwnership, setFormOfOwnership] = useState('');
  const [languageOfStudy, setLanguageOfStudy] = useState('');
  const [yearOfFoundation, setYearOfFoundation] = useState('');
  //const [workPattern, setWorkPattern] = useState('');
  const [workingHoursStart, setWorkingHoursStart] = useState('');
  const [workingHoursEnd, setWorkingHoursEnd] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  //console.log(organization);

  const rows = [
    createData("Форма собственности", organization.ownership && organization.ownership.ownership_name),
    createData("Язык обучения", organization.languages && organization.languages.languages_name),
    createData("Год основания", organization.organization_year),
    createData("График работы", organization.schedule && organization.schedule.schedule_name),
    createData("Время начала работы", organization.work_time_start),
    createData("Время конца работы", organization.work_time_end),
    createData("Телефон", organization && organization.organization_phone),
    createData("Вэб сайт", organization.organization_website),
    createData("Адрес", organization.organization_address),
    createData("Полное имя на Казахском", organization.organizations_full_name_kaz),
    createData("Полное имя на Русском", organization.organizations_full_name_rus)
  ];

  //console.log(id);


  const deleteOrganization = () => {
    deleteOrganizationAction(id);
    setOpenDeleteModal(false);
    setAlertAction('Организация удалена', 'warning');
  };

  //console.log(yearOfFoundation);

  const handleAddOrganization = () => {
    setOpen(false);
    //setFormOfOwnership('');
    setLanguageOfStudy('');
    setYearOfFoundation('');
    //setWorkPattern('');
    setWorkingHoursStart('');
    setWorkingHoursEnd('');
    setPhoneNumber('');
    setWebsite('');
    setAddress('');
    setCompanyName('');
    setOrganizationIsEdited(!organizationIsEdited);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  //console.log(openTable);
  const classes = useStyles();
  return (

    <TableContainer>
      {selectedId === id && (
        <>
          <Dialog open={ openDeleteModal } onClose={ handleClose } aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Удалить организцию?</DialogTitle>
            <DialogContent>
              <Typography> Вы уверены, что хотите удалить организцию?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleCloseDeleteModal } color="primary">
                Отмена
          </Button>
              <Button color="primary" onClick={ deleteOrganization } aria-label="delete" >
                Подвердить
          </Button>
            </DialogActions>
          </Dialog>
          <Table className={ classes.table } aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><strong>{ "Компания".toUpperCase() }</strong></TableCell>
                <TableCell align="right"><strong>{ organization.organization_name.toUpperCase() }</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rows.map((row) => (
                <TableRow key={ row.name }>
                  <TableCell component="th" scope="row">
                    { row.name }
                  </TableCell>
                  <TableCell align="right">{ row.fat }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
          <Dialog
            open={ open }
            onClose={ handleClose }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <div className={ classes.root }>
                <Grid container spacing={ 3 }>
                  <Grid item xs={ 12 }>
                    <form className={ classes.root } noValidate autoComplete="off">
                      <FormControl className={ classes.formControl }>
                        <TextField
                          id="datetime-local"
                          label="Название компании"
                          type="text"
                          value={ companyName }
                          onChange={ (e) => setCompanyName(e.target.value) }
                          className={ classes.textField }
                          InputLabelProps={ {
                            shrink: true,
                          } }
                        />
                      </FormControl>
                      {/* <FormControl className={ classes.formControl }>
                        <InputLabel id="demo-simple-select-label">Форма собственности</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={ formOfOwnership }
                          onChange={ (e) => setFormOfOwnership(e.target.value) }
                        >
                          { ownerships.map(ownership => <MenuItem key={ ownership.id } value={ ownership.id }>{ ownership.ownership_name }</MenuItem>) }

                        </Select>
                      </FormControl> */}
                      <FormControl className={ classes.formControl }>
                        <InputLabel id="demo-simple-select-label">Язык обучения</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={ languageOfStudy }
                          onChange={ (e) => setLanguageOfStudy(e.target.value) }
                        >
                          { languages.map(language => {
                            //console.log(language);
                            return (
                              <MenuItem key={ language.language_id } value={ language.language_id }>{ language.languages_name }</MenuItem>
                            );
                          }
                          ) }
                        </Select>
                      </FormControl>
                      <FormControl className={ classes.formControl }>
                        <TextField
                          id="date"
                          label="Год основания"
                          value={ yearOfFoundation }
                          type="date"
                          required={ true }
                          onChange={ (e) => setYearOfFoundation(e.target.value) }
                          className={ classes.textField }
                          InputLabelProps={ {
                            shrink: true,
                          } }
                        />
                      </FormControl>
                      {/* <FormControl className={ classes.formControl }>
                        <InputLabel id="demo-simple-select-label">График работы</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={ workPattern }
                          onChange={ (e) => setWorkPattern(e.target.value) }
                        >
                          { schedules.map(schedule => <MenuItem key={ schedule.id } value={ schedule.id }>{ schedule.schedule_name }</MenuItem>) }
                        </Select>
                      </FormControl> */}
                      <FormControl className={ classes.formControl }>
                        <TextField
                          id="time"
                          label="Начало рабочего дня"
                          type="time"
                          defaultValue="07:30"
                          value={ workingHoursStart }
                          onChange={ (e) => setWorkingHoursStart(e.target.value) }
                          className={ classes.textField }
                          InputLabelProps={ {
                            shrink: true,
                          } }
                          inputProps={ {
                            step: 300, // 5 min
                          } }
                        />
                        <TextField
                          id="time"
                          label="Окончание рабочего дня"
                          type="time"
                          defaultValue="07:30"
                          className={ classes.textField }
                          value={ workingHoursEnd }
                          onChange={ (e) => setWorkingHoursEnd(e.target.value) }
                          InputLabelProps={ {
                            shrink: true,
                          } }
                          inputProps={ {
                            step: 300, // 5 min
                          } }
                        />
                      </FormControl>
                      <FormControl className={ classes.formControl }>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Номер телефона"
                          multiline
                          type="number"
                          rowsMax={ 4 }
                          value={ phoneNumber }
                          onChange={ (e) => setPhoneNumber(e.target.value) }
                        />
                      </FormControl>
                      <FormControl className={ classes.formControl }>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Вэб сайт"
                          multiline
                          rowsMax={ 4 }
                          value={ website }
                          onChange={ (e) => setWebsite(e.target.value) }
                        />
                      </FormControl>
                      <FormControl className={ classes.formControl }>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Адрес"
                          multiline
                          type="text"
                          rowsMax={ 4 }
                          value={ address }
                          onChange={ (e) => setAddress(e.target.value) }
                        />
                      </FormControl>
                      <FormControl className={ classes.formControl }>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Широта"
                          multiline
                          rowsMax={ 2 }
                          value={ latitude }
                          onChange={ (e) => setLatitude(e.target.value) }
                        />
                      </FormControl>
                      <FormControl className={ classes.formControl }>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Долгота"
                          multiline
                          rowsMax={ 2 }
                          value={ longitude }
                          onChange={ (e) => setLongitude(e.target.value) }
                        />
                      </FormControl>
                    </form>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleClose } color="primary">
                Отменить
          </Button>
              <Button color="primary" onClick={ handleAddOrganization } autoFocus>
                Добавить
          </Button>
            </DialogActions>
          </Dialog>
        </>
      ) }

    </TableContainer>
  );
}

export default OragnizationsTable;