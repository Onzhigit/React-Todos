import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import EditEmployeesToOrganization from './EditTimetableToOrganization';
import TimetableDialog from './TimetableDialog/Container'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  extendedIcon: {
    marginRight: theme.spacing(0),
  },
}));

const Container = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  min-height:300px;
  border:1px solid #ADF3FF;
  margin-top:20px;
`;

const Cell = styled.span`
  /* background-color:blue; */
  display:flex;
  flex:0.4;
  justify-content:center;
  align-items:center;
  height:100%;
  border-right:1px solid #ADF3FF;
`;

const Row = styled.ul`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  /* min-height:30px; */
  border-bottom:1px solid #ADF3FF;
  /* background-color:red; */
  margin:0;
  cursor:pointer;
  ${Cell}:nth-child(1) {
    flex:0.2
  }

  ${Cell}:last-child {
    border-right:none
  }
`;

function ListOfTimetables({ timeTables, employeesByOrgId, kidsAgeGroup, getKidsAgeGroupAction, deleteTimetableByIdAction, services, languages, updateTimetableAction, orgId, setAlertAction, kidsGroupsByKidsAgeId, getKidsGroupsByKidsAgeGroupId }) {
  const classes = useStyles();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [id, setId] = useState(false);

  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  // all schedules
  const [schedules, setSchedules] = useState([]);
  const [cost, setCost] = useState('');
  const [language, setLanguage] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [group, setGroup] = useState('')

  // another state to open modal for editing different from the modal to add schedule
  const [openScheduleEdit, setOpenScheduleEdit] = useState(false);
  // one schedule
  const [schedule, setSchedule] = useState([]);

  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setId(id);
  };

  const handleEditEmployee = (id) => {
    //console.log('here we go');
    setOpenScheduleEdit(true);
    timeTables.forEach(item => {
      if (item.service_timetable_id === id) {
        setSchedule(item);
      }
    });
  };

  useEffect(() => {
    setCost(schedule.cost);
    setAgeGroup(schedule.kids_age_groups_id);
    setName(schedule.organizations_staff_id);
    setSelectedService(schedule.sub_sections_id);
    setSchedules(schedule.timetable_time);
    setLanguage(schedule.languages_id);
    setGroup(schedule.kids_groups_id);
  }, [schedule]);

  //console.log(schedule);
  //console.log(group);

  return (
    <Container>
      <DeleteConfirmationDialog
        entityName="работника"
        scheduleId={ id }
        setOpenDeleteModal={ setOpenDeleteModal }
        openDeleteModal={ openDeleteModal }
        deleteTimetableByIdAction={ deleteTimetableByIdAction }
        schedule={ schedule }
        setAlertAction={ setAlertAction }
      />
      <EditEmployeesToOrganization
        setOpenScheduleEdit={ setOpenScheduleEdit }
        openScheduleEdit={ openScheduleEdit }
        employeesByOrgId={ employeesByOrgId }
        id={ id }
        kidsAgeGroup={ kidsAgeGroup }
        getKidsAgeGroupAction={ getKidsAgeGroupAction }
        schedule={ schedule }
        services={ services }
        enabledAddButton={ true }
        languages={ languages }
        setName={ setName }
        name={ name }
        orgId={ orgId }
        setSchedules={ setSchedules }
        schedules={ schedules }
        setAgeGroup={ setAgeGroup }
        ageGroup={ ageGroup }
        setCost={ setCost }
        cost={ cost }
        setLanguage={ setLanguage }
        language={ language }
        setSelectedService={ setSelectedService }
        selectedService={ selectedService }
        setGroup={setGroup}
        group={group}
        updateTimetableAction={ updateTimetableAction }
        serviceTimetableId={ schedule.service_timetable_id }
        setAlertAction={ setAlertAction }
        kidsGroupsByKidsAgeId={kidsGroupsByKidsAgeId}
        getKidsGroupsByKidsAgeGroupId={getKidsGroupsByKidsAgeGroupId}
      />
      {timeTables && timeTables.map((timetable) => {
        return (
          <Row key={ timetable.service_timetable_id }>
            <Cell>
              <IconButton aria-label="edit" onClick={ () => handleEditEmployee(timetable.service_timetable_id) } className={ classes.margin }>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={ () => handleOpenDeleteModal(timetable.service_timetable_id) } aria-label="delete" className={ classes.margin }>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Cell>
            <Cell>{ timetable.cost }</Cell>
            <Cell>{ timetable.organizations_staff.first_name } { timetable.organizations_staff.last_name }</Cell>
            <Cell>{ timetable.kids_agegroup.kids_age_group_name }</Cell>
            <Cell>{ timetable.languages && timetable.languages.length > 0 && timetable.languages.map(item => item.languages_name) }</Cell>
            <Cell>{ timetable.sub_sections.section_name_ru }</Cell>
            <Cell>{ timetable.kids_group && timetable.kids_group.group_name }</Cell>
            <Cell><TimetableDialog data={ timetable.timetable_time }/></Cell>
          </Row>
        );

      }) }
    </Container>
  );
}

export default ListOfTimetables;
