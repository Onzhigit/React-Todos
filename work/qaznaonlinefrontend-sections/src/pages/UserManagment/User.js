import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Components/Header';
import Tabs from './Components/Tabs';
import { SelectionDialog } from './Components/Dialog';
import { loadUsersByRoleAction, updateUsersByRoleAction, addUserByRoleAction, deleteUserByRoleaction, getEgovServices, getRolesAction, filterUsersByRoleAction } from '../../actions/admin-user';
import { loadOrganizations } from '../../actions/organization';
import { getUsersByOrganizationId } from '../../actions/admin-user';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectDropDown from './Components/SelectDropDown';
import Cookies from 'js-cookie';


const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: '',
    justifyContent: 'center',
    //background:'blue',
    minHeight: '600px',
    marginTop: 30
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    minHeight: 300
  },
  divider: {
    margin: theme.spacing(2, 0),
  }
}));

const UserManagement = ({ adminUsersProp, loadUsersByRoleAction, updateUsersByRoleAction, organizationsProps, loadOrganizations, getUsersByOrganizationId, usersByOrganizationProps, getEgovServices, egovServiceListProps, rolesProps, getRolesAction, filterUsersByRoleAction, filteredUsersProps }) => {
  const classes = useStyles();
  const token = `Bearer ${Cookies.get('userCookie')}`;
  const [openModal, setOpenModal] = useState(false);
  const [chosenRole, setChosenRole] = useState('');
  const [chosenUsers, setChosenUsers] = React.useState([]);
  const [organizationChosen, setOrganizationChosen] = React.useState('');
  const [serviceChosen, setServiceChosen] = React.useState('');
  const [usersByOrganization, setUsersByOrganization] = React.useState([]);

  const [filteredUsersByRole, setFilteredUsersByRole] = React.useState([]);
  const [value, setValue] = React.useState(0);

  //console.log({filteredUsersProps});


  // Distribute users by their roles
  React.useEffect(() => {
    rolesProps.forEach((role) => {
      if (role.role_id === value) {
        setFilteredUsersByRole(filteredUsersProps);
      }
    });
  }, [filteredUsersProps, rolesProps, value]);

  React.useEffect(() => {
    loadUsersByRoleAction();
  }, [loadUsersByRoleAction]);

  React.useEffect(() => {
    getUsersByOrganizationId(organizationChosen, token);
  }, [getUsersByOrganizationId, organizationChosen, token]);

  React.useEffect(() => {
    loadOrganizations();
  }, [loadOrganizations]);

  React.useEffect(() => {
    getRolesAction();
  }, [getRolesAction]);

  React.useEffect(() => {
    if (usersByOrganizationProps && usersByOrganizationProps.length > 0) {
      let newArray = usersByOrganizationProps.map(user => (
        {
          users_organizations_id: user.users_organizations_id,
          name: user.users.name,
          user_id: user.users.user_id
        }
      )
      );
      setUsersByOrganization(newArray);
    } else {
      setUsersByOrganization([]);
    }
  }, [organizationChosen, usersByOrganizationProps]);

  React.useEffect(() => {
    getEgovServices(token);
  }, [getEgovServices, token]);

  //console.log(organizationChosen);
  //console.log(serviceChosen);
  //console.log({egovServiceListProps});

  return (
    <Container className={ classes.root }>
      <SelectionDialog
        adminUsersProp={ adminUsersProp }
        updateUsersByRoleAction={ updateUsersByRoleAction }
        chosenRole={ chosenRole }
        chosenUsers={ chosenUsers }
        setChosenRole={ setChosenRole }
        open={ openModal }
        setOpenModal={ setOpenModal }
        setChosenUsers={ setChosenUsers }
        roles={ rolesProps }
        setServiceChosen={ setServiceChosen }
        serviceChosen={ serviceChosen }
        egovServiceListProps={ egovServiceListProps }
      />
      <Grid container spacing={ 3 } maxWidth="md">
        <Grid item xs={ 8 }>
          <Paper className={ classes.paper }>
            <Header title="Управление ролью сотрудника" />
            <Grid container spacing={ 3 }>
              <Grid item xs={ 12 }>
                <SelectDropDown
                  label="Организация"
                  organizations={ organizationsProps }
                  setOrganizationChosen={ setOrganizationChosen }
                  organizationChosen={ organizationChosen }
                  setFilteredUsersByRole={ setFilteredUsersByRole }
                  filteredUsersByRole={ filteredUsersByRole }
                />
              </Grid>
              {/* <Grid item xs={ 6 }>
                <SelectDropDown
                  label="Услуга"
                  services={ egovServiceListProps }
                  serviceChosen={ serviceChosen }
                  setServiceChosen={ setServiceChosen }
                />
              </Grid> */}
            </Grid>
            <Tabs
              adminUsersProp={ adminUsersProp }
              usersByOrganization={ usersByOrganization }
              setChosenUsers={ setChosenUsers }
              setOpenModal={ setOpenModal }
              updateUsersByRoleAction={ updateUsersByRoleAction }
              chosenUsers={ chosenUsers }
              roles={ rolesProps }
              filterUsersByRoleAction={ filterUsersByRoleAction }
              filteredUsersProps={ filteredUsersProps }
              setUsersByOrganization={ setUsersByOrganization }
              setValue={ setValue }
              value={ value }
              filteredUsersByRole={ filteredUsersByRole }
              setFilteredUsersByRole={setFilteredUsersByRole}
            />
          </Paper>
        </Grid>
        <Grid item xs={ 6 }>
          blank
        </Grid>
        {/* <Grid item xs={ 6 }>
          <Paper className={ classes.paper }>xs=3</Paper>
        </Grid>
        <Grid item xs={ 6 }>
          <Paper className={ classes.paper }>xs=3</Paper>
        </Grid> */}
      </Grid>
    </Container>
  );
};

UserManagement.propTypes = {
  loadUsersByRoleAction: PropTypes.func.isRequired,
  updateUsersByRoleAction: PropTypes.func.isRequired,
  addUserByRoleAction: PropTypes.func.isRequired,
  deleteUserByRoleaction: PropTypes.func.isRequired,
  getUsersByOrganizationId: PropTypes.func.isRequired,
  getEgovServices: PropTypes.func.isRequired,
  getRolesAction: PropTypes.func.isRequired,
  filterUsersByRoleAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  adminUsersProp: state.adminUsersReducer.usersByRole,
  organizationsProps: state.organizationReducer.organizations,
  usersByOrganizationProps: state.adminUsersReducer.usersByOrganization,
  egovServiceListProps: state.adminUsersReducer.egovServiceList,
  rolesProps: state.adminUsersReducer.roles,
  filteredUsersProps: state.adminUsersReducer.filteredUsers
});

export default connect(mapStateToProps, { loadUsersByRoleAction, updateUsersByRoleAction, addUserByRoleAction, deleteUserByRoleaction, loadOrganizations, getUsersByOrganizationId, getEgovServices, getRolesAction, filterUsersByRoleAction })(UserManagement);
