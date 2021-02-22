import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { deepPurple } from '@material-ui/core/colors';
import DataTable from './DataTable'
import DehazeIcon from '@material-ui/icons/Dehaze';
import AddIcon from '@material-ui/icons/Add';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
   
  },
  tab: {
      flexGrow: 1,
  },
  tabs: {
    backgroundColor:deepPurple[700]
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const arr = [ 'ItemOne', 'ItemTwo', 'ItemThree']

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      
      <AppBar position="static">
        <Tabs className={classes.tabs} value={value} onChange={handleChange} aria-label="simple tabs example">
          
          <Tab icon={<DehazeIcon />}             
               className={classes.tab} 
               label="Өтініштер" {...a11yProps(0)} />
          <Tab icon={<DehazeIcon />}
               className={classes.tab} 
               label="Онделгер отинимдер" {...a11yProps(1)} />
          <Tab icon={<AddIcon/>}
               className={classes.tab} 
               label="Мурагат" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <DataTable />
        
      </TabPanel>
      
    
    </div>)
}
