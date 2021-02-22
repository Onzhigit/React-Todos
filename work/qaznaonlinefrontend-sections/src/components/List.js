import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import BusinessIcon from '@material-ui/icons/Business';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import DialogForTable from './Dialog';
import OraganizationsInfoTable from './OraganizationsInfoTable';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  avatarColored: {
    color: theme.palette.getContrastText(deepPurple[700]),
    backgroundColor: deepPurple[700]
  }

}));


function ListComp({ listData, withDialog }) {
  const classes = useStyles();

  return (
    <List className={ classes.root }>
      { listData && listData.map((org) => (
        <ListItem key={ org.organization_id }>
          <ListItemAvatar>
            <Avatar className={ classes.avatarColored }>
              <BusinessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ org.organization_name } />
          {
            withDialog && (
              <DialogForTable isDetailedButtonShown={ true } buttonName="подробнее" title="Информация о компании" children={ <OraganizationsInfoTable org={ org } /> } buttonConfirmAction="подтвердить" />
            )
          }
        </ListItem>
      )) }
    </List>
  );
}

export default ListComp;
