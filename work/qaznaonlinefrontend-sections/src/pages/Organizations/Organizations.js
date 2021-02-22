import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../organizations/Table';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { loadOrganizations, addOrganization, updateOrganizationAction, deleteOrganizationAction, loadAddedServiceToOrganzationAction, addServicesToOrganizationAction, deleteServicesFromOrganization, deleteEmployeeFromOrganizationAction, getEmployeesByOrgIdAction } from '../../actions/organization';
import { EnableAddDialogButtonAction, getLanguagesAction } from '../../actions/utilsActions';
import { loadServicesAction, getKidsAgeGroupAction, createTimetableForEmployeeAction, getTimetableByOrgIdAction, deleteTimetableByIdAction, updateTimetableAction, getKidsGroupAction, addGroupToKidsAgeGroupAction, deleteGroupFromKidsAgeGroupAction, updateGroupOfKidsAgeGroup, getKidsGroupsByKidsAgeGroupId } from '../../actions/services';
import { setAlertAction } from '../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddTimetableToOrganziation from '../../components/AddTimetableToOrganziation';
import ListOfTimetables from '../../components/ListOfTimetables';
import { GroupToKidsAgeTable } from '../../components/AddGroupsToKidsAge/GroupsToKidsAge';
import SkeletonOrganizations from './SkeletonOrganizations';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import { deepPurple } from '@material-ui/core/colors';


// tabs components
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const ListContainer = styled.ul`
  display:flex;
  flex-direction:column;
  align-items:center;
  width:100%;
  min-height:120px;
`;

const ListItem = styled.li`
  display:flex;
  justify-content:space-between;
  cursor:pointer;  
  height:40px;
  padding:5px;
  font-size:16px;
  color:black;
  width:100%;
  border-left:${(props) => props.clicked && '3px solid #3F51B5'};
  list-style-type:none;
`;


const useStyles = makeStyles((theme) => (
  {
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
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: 'calc(100vh - 80px)'
    },
    tab: {
      backgroundColor: deepPurple[700]
    }
  }));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `wrapped-tabpanel-${index}` }
      aria-labelledby={ `wrapped-tab-${index}` }
      { ...other }
    >
      {value === index && (
        <Box>
          { children }
        </Box>
      ) }
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const Organizations = ({ loadOrganizations, organizations, updateOrganizationAction, deleteOrganizationAction, services, loadServicesAction, EnableAddDialogButtonAction, enabledAddButton, addEmployeeToOrganizationAction, setAlertAction, getEmployeesByOrgIdAction, employeesByOrgId, getKidsAgeGroupAction, kidsAgeGroup, getLanguagesAction, languages, createTimetableForEmployeeAction, timeTables, getTimetableByOrgIdAction, deleteTimetableByIdAction, updateTimetableAction, getKidsGroupAction, kidsGroup, addGroupToKidsAgeGroupAction, deleteGroupFromKidsAgeGroupAction, updateGroupOfKidsAgeGroup, getKidsGroupsByKidsAgeGroupId, kidsGroupsByKidsAgeId }) => {
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState('');
  const [organizationIsEdited, setOrganizationIsEdited] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTermIsEmpty, setSearchTermIsEmpty] = useState(true);

  // Tabs state
  const [tabValue, setTabValue] = React.useState('one');

  // array of all organiations with id and clicked properties to highlight a clicked item
  const [clickedArr, setClickedArr] = useState([]);

  // change values of tabs
  const tabsHandleChange = (event, newValue) => {
    setTabValue(newValue);
  };


  // get all organziations and set organizations
  useEffect(() => {
    loadOrganizations();
    loadServicesAction();
  }, [searchTermIsEmpty, organizationIsEdited, loadOrganizations, loadServicesAction]);

  // make clicked array
  useEffect(() => {
    let newArr = [];
    organizations && organizations.forEach((org) => {
      newArr.push({
        id: org.organization_id,
        clicked: false,
        name: org.organization_name
      });
    });
    setClickedArr(newArr);
  }, [organizations]);


  // Call get kids group action
  useEffect(() => {
    getKidsGroupAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get all languages and set languages
  useEffect(() => {
    getLanguagesAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get timetables by org id
  useEffect(() => {
    getTimetableByOrgIdAction(selectedId);
  }, [getTimetableByOrgIdAction, selectedId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const searchOrganizations = event => {
    event.preventDefault();
    let newArr = clickedArr.filter(item =>
      item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    );
    if (event.target.value !== '') {
      setSearchTermIsEmpty(false);
    } else {
      setSearchTermIsEmpty(true);
    }
    setClickedArr(newArr);
  };

  const showOrganization = (id) => {
    EnableAddDialogButtonAction(true);
    setSelectedId(id);
    clickedArr.forEach((org) => {
      if (org.id === id) {
        org.clicked = true;
      } else {
        org.clicked = false;
      }
    });
  };

  useEffect(() => {
    if (selectedId) {
      getEmployeesByOrgIdAction(selectedId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (

    <div className={ classes.root }>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 3 }>
          <Paper className={ classes.paper }>
            <form className={ classes.root } noValidate autoComplete="off">
              <TextField id="standard-basic" label="Поиск организаций" onChange={ searchOrganizations } />
            </form>
            <ListContainer>
              { clickedArr.length > 0 && clickedArr.map(organization => {
                return (
                  <ListItem button key={ organization.id } className={ classes.listItem } clicked={ organization.clicked } onClick={ () => showOrganization(organization.id) }>
                    {organization.name }
                    <BusinessOutlinedIcon />
                  </ListItem>);
              }) }
            </ListContainer>
          </Paper>
        </Grid>
        <Grid item xs={ 9 }>
          <Paper className={ classes.paper }>
            { selectedId && organizations ? organizations.map((organization) => (
              <Box xs={ 3 } key={ organization.organization_id }>
                <Table
                  openTable={ handleClickOpen }
                  languages={ languages }
                  setOpen={ setOpen }
                  open={ open }
                  id={ organization.organization_id }
                  organization={ organization }
                  selectedId={ selectedId }
                  setOrganizationIsEdited={ setOrganizationIsEdited }
                  organizationIsEdited={ organizationIsEdited }
                  updateOrganizationAction={ updateOrganizationAction }
                  deleteOrganizationAction={ deleteOrganizationAction }
                  setAlertAction={ setAlertAction }
                />
              </Box>
            )) : <SkeletonOrganizations /> }
            { enabledAddButton && (
              <div>
                <AppBar position="static">
                  <Tabs value={ tabValue } onChange={ tabsHandleChange } aria-label="wrapped label tabs example" className={ classes.tab }>
                    <Tab
                      value="one"
                      label="Расписание"
                      wrapped
                      { ...a11yProps('one') }
                    />
                    <Tab value="two" label="Группы" { ...a11yProps('two') } />
                  </Tabs>
                </AppBar>
                <TabPanel value={ tabValue } index="one">
                  <Paper>
                    <AddTimetableToOrganziation
                      services={ services }
                      enabledAddButton={ enabledAddButton }
                      addEmployeeToOrganizationAction={ addEmployeeToOrganizationAction }
                      employeesByOrgId={ employeesByOrgId }
                      orgId={ selectedId }
                      getKidsAgeGroupAction={ getKidsAgeGroupAction }
                      kidsAgeGroup={ kidsAgeGroup }
                      languages={ languages }
                      createTimetableForEmployeeAction={ createTimetableForEmployeeAction }
                      setAlertAction={ setAlertAction }
                      getKidsGroupsByKidsAgeGroupId={ getKidsGroupsByKidsAgeGroupId }
                      kidsGroupsByKidsAgeId={ kidsGroupsByKidsAgeId }
                    />

                    { enabledAddButton &&
                      <ListOfTimetables
                        deleteTimetableByIdAction={ deleteTimetableByIdAction }
                        services={ services }
                        employeesByOrgId={ employeesByOrgId }
                        timeTables={ timeTables }
                        kidsAgeGroup={ kidsAgeGroup }
                        languages={ languages }
                        orgId={ selectedId }
                        getKidsAgeGroupAction={ getKidsAgeGroupAction }
                        updateTimetableAction={ updateTimetableAction }
                        setAlertAction={ setAlertAction }
                        kidsGroupsByKidsAgeId={ kidsGroupsByKidsAgeId }
                        getKidsGroupsByKidsAgeGroupId={ getKidsGroupsByKidsAgeGroupId }
                      /> }
                  </Paper>
                </TabPanel>
                <TabPanel value={ tabValue } index="two">
                  <GroupToKidsAgeTable kidsGroup={ kidsGroup } addGroupToKidsAgeGroupAction={ addGroupToKidsAgeGroupAction } deleteGroupFromKidsAgeGroupAction={ deleteGroupFromKidsAgeGroupAction } updateGroupOfKidsAgeGroup={ updateGroupOfKidsAgeGroup } />
                </TabPanel>
              </div>
            ) }
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

Organizations.propTypes = {
  loadOrganizations: PropTypes.func.isRequired,
  addOrganization: PropTypes.func.isRequired,
  updateOrganizationAction: PropTypes.func.isRequired,
  deleteOrganizationAction: PropTypes.func.isRequired,
  loadServicesAction: PropTypes.func.isRequired,
  loadAddedServiceToOrganzationAction: PropTypes.func.isRequired,
  EnableAddDialogButtonAction: PropTypes.func.isRequired,
  addServicesToOrganizationAction: PropTypes.func.isRequired,
  deleteServicesFromOrganization: PropTypes.func.isRequired,
  deleteEmployeeFromOrganizationAction: PropTypes.func.isRequired,
  getEmployeesByOrgIdAction: PropTypes.func.isRequired,
  getKidsAgeGroupAction: PropTypes.func.isRequired,
  setAlertAction: PropTypes.func.isRequired,
  createTimetableForEmployeeAction: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
  getLanguagesAction: PropTypes.func.isRequired,
  getTimetableByOrgIdAction: PropTypes.func.isRequired,
  deleteTimetableByIdAction: PropTypes.func.isRequired,
  updateTimetableAction: PropTypes.func.isRequired,
  getKidsGroupAction: PropTypes.func.isRequired,
  addGroupToKidsAgeGroupAction: PropTypes.func.isRequired,
  deleteGroupFromKidsAgeGroupAction: PropTypes.func.isRequired,
  updateGroupOfKidsAgeGroup: PropTypes.func.isRequired,
  getKidsGroupsByKidsAgeGroupId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  organizations: state.organizationReducer.organizations,
  services: state.serviceReducer.services,
  enabledAddButton: state.utilsStateReducer.addButtonEnabled,
  loadedServicesToOrganziation: state.organizationReducer.servicesByOrganization,
  employeesByOrganization: state.organizationReducer.employeesByOrganization,
  employeesByOrgId: state.organizationReducer.employeesByOrgId,
  kidsAgeGroup: state.serviceReducer.kidsAgeGroup,
  languages: state.utilsStateReducer.languages,
  timeTables: state.serviceReducer.timeTables,
  kidsGroup: state.serviceReducer.kidsGroup,
  kidsGroupsByKidsAgeId: state.serviceReducer.kidsGroupsByKidsAgeId
});

export default connect(mapStateToProps, { loadOrganizations, addOrganization, updateOrganizationAction, deleteOrganizationAction, loadServicesAction, EnableAddDialogButtonAction, loadAddedServiceToOrganzationAction, addServicesToOrganizationAction, deleteServicesFromOrganization, deleteEmployeeFromOrganizationAction, setAlertAction, getEmployeesByOrgIdAction, getKidsAgeGroupAction, getLanguagesAction, createTimetableForEmployeeAction, getTimetableByOrgIdAction, deleteTimetableByIdAction, updateTimetableAction, getKidsGroupAction, addGroupToKidsAgeGroupAction, deleteGroupFromKidsAgeGroupAction, updateGroupOfKidsAgeGroup, getKidsGroupsByKidsAgeGroupId })(Organizations);
