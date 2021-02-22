import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { AssignRoleTable } from './AssignRoleTable';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { deepPurple } from '@material-ui/core/colors';

export function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  tab: {
    backgroundColor: deepPurple[700],
    color: 'white',
  },
}));

export default function FullWidthTabs({
  open,
  setOpenModal,
  adminUsersProp,
  setChosenUsers,
  updateUsersByRoleAction,
  chosenUsers,
  usersByOrganization,
  roles,
  filterUsersByRoleAction,
  setValue,
  value,
  filteredUsersByRole,
  setFilteredUsersByRole,
}) {
  const classes = useStyles();
  const theme = useTheme();

  React.useEffect(() => {
    console.log(usersByOrganization.length > 0);
    if (!usersByOrganization.length > 0) {
      setFilteredUsersByRole([]);
      setValue(null)
    }
    if (value !== 'all_users') {
      filterUsersByRoleAction(value);
    }
  }, [
    filterUsersByRoleAction,
    value,
    usersByOrganization,
    setFilteredUsersByRole,
    setValue
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          className={classes.tab}
          variant='fullWidth'
          aria-label='full width tabs example'>
          <Tab label={<PersonAddIcon />} {...a11yProps(0)} />
          <Tab
            value={roles[0] && roles[0].role_id}
            label='Приниматель'
            {...a11yProps(1)}
          />
          <Tab
            value={roles[1] && roles[1].role_id}
            label='Утвердитель 1'
            {...a11yProps(2)}
          />
          <Tab
            value={roles[1] && roles[2].role_id}
            label='Утвердитель 2'
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <AssignRoleTable
          setChosenUsers={setChosenUsers}
          open={open}
          setOpenModal={setOpenModal}
          usersByOrganization={usersByOrganization}
          updateUsersByRoleAction={updateUsersByRoleAction}
          chosenUsers={chosenUsers}
        />
      </TabPanel>
      <AssignRoleTable
        setChosenUsers={setChosenUsers}
        usersByRole={filteredUsersByRole}
        open={open}
        setOpenModal={setOpenModal}
        filteredUsersProps={filteredUsersByRole}
        updateUsersByRoleAction={updateUsersByRoleAction}
        chosenUsers={chosenUsers}
      />
      <TabPanel value={value} index={2} dir={theme.direction}>
        <AssignRoleTable
          setChosenUsers={setChosenUsers}
          usersByRole={filteredUsersByRole}
          open={open}
          setOpenModal={setOpenModal}
          filteredUsersProps={filteredUsersByRole}
          updateUsersByRoleAction={updateUsersByRoleAction}
          chosenUsers={chosenUsers}
        />
      </TabPanel>
      <TabPanel
        value={roles[2] && roles[2].roles_id}
        index={3}
        dir={theme.direction}>
        <AssignRoleTable
          setChosenUsers={setChosenUsers}
          usersByRole={filteredUsersByRole}
          open={open}
          setOpenModal={setOpenModal}
          adminUsersProp={adminUsersProp}
          filteredUsersProps={filteredUsersByRole}
          updateUsersByRoleAction={updateUsersByRoleAction}
          chosenUsers={chosenUsers}
        />
      </TabPanel>
    </div>
  );
}
