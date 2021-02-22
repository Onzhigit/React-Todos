import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ExpandLess, ExpandMore, LocationCity as LocationCityIcon, LocalActivity, Business, School as SchoolIcon, Attachment, Fastfood as FastFoodIcon, Commute as CommuteIcon, Info as InfoIcon, NaturePeople as NaturePeopleIcon } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuBtn: {
    textDecoration: 'none'
  }
});

export default function Drawer({ openDrawer, setOpenDrawer }) {
  const classes = useStyles();
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapseSubsidizedMealsOpen, setCollapseSubsidizedMealsOpen] = useState(false);
  const [collapseTransportingOpen, setCollapseTransportingOpen] = useState(false);
  const [collapseCampOpen, setCollapseCampOpen] = useState(false);

  const onDrawerClose = () => {
    setOpenDrawer(false);
  };

  const collapsedMenuItems = (headerName, headerIcon, state, handler, items) =>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={ classes.root }
    >
      <ListItem button onClick={ () => handler(!state) }>
        <ListItemIcon>
          { headerIcon }
        </ListItemIcon>
        <ListItemText primary={ headerName } />
        { state ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ state } timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          { items.map((item, index) => (
            <Link to={ item.path }>
              <ListItem key={index} button className={ classes.nested }>
                <ListItemIcon>
                  { item.icon }
                </ListItemIcon>
                <ListItemText primary={ item.itemName } />
              </ListItem>
            </Link>
          )) }
        </List>
      </Collapse>
    </List>;

  const menuItem = (name, icon, path) =>
    <Link to={path}>
      <ListItem button>
        <ListItemIcon>{ icon }</ListItemIcon>
        <ListItemText primary={ name } />
      </ListItem>
    </Link>;


  const list = (anchor) => (
    <div
      className={ clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      }) }
      role="presentation"
    >
      
      {collapsedMenuItems('Льготное питание', <FastFoodIcon />, collapseSubsidizedMealsOpen, setCollapseSubsidizedMealsOpen, [{
        itemName: 'Заявки',
        path: 'subsidizedMealsApplications',
        icon: <Attachment />
      }, {
        itemName: 'Инофрмация',
        path: 'freefoodinfo',
        icon: <InfoIcon />
      }]) }
      <Divider />
      {collapsedMenuItems('Развозка', <CommuteIcon />, collapseTransportingOpen, setCollapseTransportingOpen, [{
        itemName: 'Заявки',
        path: 'transporting',
        icon: <Attachment />
      }, {
        itemName: 'Инофрмация',
        path: 'transportingInfo',
        icon: <InfoIcon />
      }]) }
      <Divider />
      {collapsedMenuItems('Лагерь', <NaturePeopleIcon />, collapseCampOpen, setCollapseCampOpen, [{
        itemName: 'Заявки',
        path: 'camp',
        icon: <Attachment />
      }, {
        itemName: 'Инофрмация',
        path: 'campInfo',
        icon: <InfoIcon />
      }]) }
      <Divider />
      {menuItem('Упраление персоналом', <LocalActivity />, '/usermanagement') }
    </div>
  );
  return (
    <div>
      <React.Fragment>
        {/* <Button onClick={toggleDrawer(openDrawer, true)}>{openDrawer}</Button> */ }
        <SwipeableDrawer
          open={ openDrawer }
          onClose={ onDrawerClose }
        >
          { list(openDrawer) }
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}