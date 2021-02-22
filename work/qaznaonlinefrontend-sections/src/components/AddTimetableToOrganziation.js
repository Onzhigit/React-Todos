import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from './Dialog';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import AddSchedule from './AddSchedule';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import { IconButton } from '@material-ui/core';
import BackspaceIcon from '@material-ui/icons/Backspace';
import AddServicesToOrganizations from './AddServicesToOrganizations';
import ChipComponent from '../components/Chip'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(0),
      display: 'flex'
    },
  },
  addDayBtn: {
    marginBottom: 6
  },
  margin: {
    marginRight: 6,
    marginLeft: 6
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

function AddScheduleToOrganziation({ enabledAddButton, employeesByOrgId, orgId, getKidsAgeGroupAction, kidsAgeGroup, languages, services, createTimetableForEmployeeAction, setAlertAction, getKidsGroupsByKidsAgeGroupId, kidsGroupsByKidsAgeId }) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [schedules, setSchedule] = useState([]);
  const [chosenEmp, setChosenEmp] = useState({});
  // Reformatted age group
  const [_kidsAgeGroup, setKidsAgeGroup] = useState([]);
  const [ageGroup, setAgeGroup] = useState('');
  const [language, setLanguage] = useState('');
  const [cost, setCost] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [group, setGroup] = useState('');
  const [serviceName, setServiceName] = useState({});

  useEffect(() => {
    getKidsAgeGroupAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getKidsGroupsByKidsAgeGroupId(ageGroup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ageGroup]);

  useEffect(() => {
    if (kidsGroupsByKidsAgeId[0]) {
      if (kidsGroupsByKidsAgeId[0].kids_groups.length > 0) {
        setGroup(kidsGroupsByKidsAgeId[0].kids_groups[0].kids_group_id);
      }
    }

  }, [kidsGroupsByKidsAgeId]);

  useEffect(() => {
    const newKidsAgeGroup = [];
    kidsAgeGroup && kidsAgeGroup.forEach(item => {
      newKidsAgeGroup.push({
        kids_age_group_id: item.kids_age_group_id,
        kids_age_group_name: item.kids_age_group_name,
        checked: false
      });
    });
    setKidsAgeGroup(newKidsAgeGroup);
  }, [kidsAgeGroup]);

  const handleTimeChange = (scheduleIdx) => (timeIdx, timeType, value) => {
    const newSchedules = schedules.map((item, itemIdx) => {
      if (itemIdx === scheduleIdx) {
        const newTimes = item.times.map((time, index) => {
          if (index !== timeIdx) {
            return time;
          }
          if (timeType === 'start') {
            return {
              ...time,
              time_start: value,
            };
          } else {
            return {
              ...time,
              time_end: value,
            };
          }
        });
        item.times = [...newTimes];
        return item;
      }
      return item;
    });
    setSchedule(newSchedules);
  };

  const addDay = () => {
    setSchedule([...schedules, {
      week_day: '',
      times: [
        {
          time_start: '',
          time_end: ''
        }
      ]
    }]);
  };

  const addTime = (id) => {
    setSchedule((prevState) => prevState.map((item, index) => {
      if (index === id) {
        item.times.push({
          time_start: '',
          time_end: ''
        });
      }
      return item;
    }));
  };

  const getPositionByid = (id) => {
    employeesByOrgId.forEach(item => {
      if (item.org_staff_id === id) {
        setChosenEmp(item);
      }
    });
  };

  useEffect(() => {
    services.forEach(service => {
      service.sub_sections.forEach(subsection => {
        if (subsection.sub_section_id === selectedService) {
          setServiceName({
            section_name_kk: subsection.section_name_kk,
            section_name_ru: subsection.section_name_ru
          });
        }
      });
    });
  }, [selectedService, services]);

  useEffect(() => {
    if (employeesByOrgId.length > 0) {
      const employee = employeesByOrgId[0];
      setChosenEmp(employee);
    }
  }, [employeesByOrgId]);

  const onDaySelected = (day_name, id) => {
    setSchedule([...schedules],
      schedules[id].week_day = day_name
    );
  };

  const validateTimetableData = () => {
    if (cost === '') {
      return false
    }
  }

  return (
    <Dialog
      title="Введите расписание для сотрудника"
      buttonConfirmAction="подтвердить"
      enabledAddButton={ enabledAddButton }
      setName={ setName }
      setSchedule={ setSchedule }
      setChosenEmp={ setChosenEmp }
      setKidsAgeGroup={ setKidsAgeGroup }
      setAgeGroup={ setAgeGroup }
      setLanguage={ setLanguage }
      setSelectedService={ setSelectedService }
      setCost={ setCost }
      employeeButton={ true }
      maxWidth="xl"
      createTimetableForEmployeeAction={ createTimetableForEmployeeAction }
      setAlertAction={ setAlertAction }
      validateTimetableData={validateTimetableData}
      employeeData={
        {
          organizations_id: orgId,
          sub_sections_id: selectedService,
          cost,
          timetable_time: schedules,
          kids_age_groups_id: ageGroup,
          organizations_staff_id: chosenEmp.org_staff_id,
          languages_id: language,
          kids_groups_id: group
        }
      }
      children={
        <Grid container spacing={ 3 }>
          <Grid item xs={ 12 }>
            <Grid container>
              <Grid item xs={ 2 } className={ classes.margin }>
                <FormGroup>
                  <FormControl className={ classes.formControl }>
                    <InputLabel
                      htmlFor="age-native-simple"
                    >
                      Имя
                    </InputLabel>
                    <Select
                      native
                      value={ name }
                      onChange={ (e) => {
                        setName(e.target.value);
                        getPositionByid(e.target.value);
                      } }
                    >
                      { employeesByOrgId.map(item => {
                        return (
                          <option key={ item.org_staff_id } value={ `${item.org_staff_id}` }>{ `${item.last_name} ${item.first_name}` }</option>
                        );
                      }) }
                    </Select>
                    <TextField id="position" disabled={ true } value={ chosenEmp.position } label="Должность" />
                    <TextField id="bin" disabled={ true } value={ chosenEmp.staff_bin } label="ИИН" />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={ 2 } className={ classes.margin }>
                <FormGroup>
                  <FormControl>
                    <InputLabel htmlFor="age-native-simple">Возрастная группа</InputLabel>
                    <Select
                      native
                      value={ ageGroup }
                      onChange={ (e) => {
                        setAgeGroup(e.target.value);
                      } }
                    >
                      { _kidsAgeGroup && _kidsAgeGroup.map(item => {
                        return (
                          <option key={ item.kids_age_group_id } value={ item.kids_age_group_id }>{ item.kids_age_group_name }</option>
                        );
                      }) }
                    </Select>
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={ 2 } className={ classes.margin }>
                <FormGroup>
                  <FormControl>
                    <InputLabel htmlFor="select-group">Группы</InputLabel>
                    <Select
                      native
                      value={ group }
                      onChange={ (e) => {
                        setGroup(e.target.value);
                      } }
                    >
                      { kidsGroupsByKidsAgeId[0] && kidsGroupsByKidsAgeId[0].kids_groups.map((item) => {
                        return (
                          <option key={ item.kids_group_id } value={ item.kids_group_id }>{ item.group_name }</option>
                        );
                      }) }
                    </Select>
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={ 2 } className={ classes.margin }>
                <FormGroup>
                  <FormControl>
                    <InputLabel htmlFor="age-native-simple">Язык обучения</InputLabel>
                    <Select
                      native
                      value={ language }
                      onChange={ (e) => {
                        setLanguage(e.target.value);
                      } }
                    >
                      { languages && languages.map(item => {
                        return (
                          <option key={ item.language_id } value={ item.language_id }>{ item.languages_name }</option>
                        );
                      }) }
                    </Select>
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={ 2 } className={ `${classes.margin} ${classes.centered}` }>
                <FormGroup>
                  <FormControl>
                    <TextField
                      id="cost"
                      label="Цена"
                      type="number"
                      value={ cost }
                      onChange={ (e) => setCost(e.target.value) }
                      InputLabelProps={ {
                        shrink: true,
                      } }
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={ 2 } className={ `${classes.margin} ${classes.centered}` }>
                { !selectedService && <AddServicesToOrganizations setSelectedService={ setSelectedService } services={ services } enabledAddButton={ enabledAddButton } /> }
                { selectedService && <ChipComponent name={serviceName.section_name_kk}/> }
                { selectedService &&
                  <IconButton aria-label="delete" className={ classes.margin } onClick={ () => { setSelectedService(''); } }>
                    <BackspaceIcon />
                  </IconButton> }
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={ 12 }>
            <Button variant="contained" size="small" color="primary" className={ classes.addDayBtn } onClick={ addDay }>
              Добавить день
            </Button>
            <Grid container>
              { schedules.map((schedule, index) => {
                return (
                  <AddSchedule handleTimeChange={ handleTimeChange(index) } addTime={ () => addTime(index) } index={ index } onDaySelected={ onDaySelected } schedule={ schedule } schedules={ schedules } setSchedule={ setSchedule } />
                );
              }) }
            </Grid>
          </Grid>
        </Grid>
      }
      buttonName="добавьте расписание"
    />
  );
}


export default AddScheduleToOrganziation;
