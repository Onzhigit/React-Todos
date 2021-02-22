import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItems from './List';
import { connect } from 'react-redux';
import { getOrganizationByVillageAction, getOrganizationByCityAction, addOrganizationToPlaceAction, loadOrganizations } from '../actions/organization';
import PropTypes from 'prop-types';
import ListOrganizationSkeleton from './ListOrganizationsSkeleton';
import { green, grey } from '@material-ui/core/colors';
import { Header } from './Typography.header';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: '30px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 400
  },
  list: {
    display: 'flex',
    maxWidth: 320,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginTop: 30,
  },
  bckColor: {
    backgroundColor: green[600],
    color: 'white',
    '&:hover': {
      backgroundColor: green[400]
    }
  }
}));

function ListOrganizations({ villageData, districtData, type, organizationsByPlace, getOrganizationByVillageAction, getOrganizationByCityAction, addOrganizationToPlaceAction, organizations, loadOrganizations }) {
  console.log(organizationsByPlace);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [orgIds, setOrgIds] = useState([]);

  const handleCheckboxChange = (event, checked) => {
    if (checked) {
      setOrgIds(prevState => [...prevState, event.target.value]);
    } else {
      setOrgIds(prevState => prevState.filter((id) => id !== event.target.value));
    }
  };

  useEffect(() => {
    loadOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOrganizationByVillageAction(villageData.area_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [villageData.area_id]);


  useEffect(() => {
    getOrganizationByCityAction(districtData.area_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtData.area_id]);


  const handleAddOrganization = () => {
    //console.log(districtData.area_id, villageData.area_id);
    addOrganizationToPlaceAction(type, orgIds, districtData.area_id, villageData.area_id);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    let orgIdsArr = [];
    for (let i = 0; i < organizations.length; i++) {
      let orgFromList = organizations[i].organization_id;
      if (organizationsByPlace && organizationsByPlace.length > 0) {
        for (let x = 0; x < organizationsByPlace.length; x++) {
          let orgFromPlace = organizationsByPlace[x].organization_id;
          if (orgFromPlace === orgFromList) {
            orgIdsArr.push(orgFromPlace);
          }
        }
      }
    }
    setOrgIds(orgIdsArr);
  }, [open, organizations, organizationsByPlace]);

  //console.log(orgIds);

  return (
    <Grid container className={ classes.container } spacing={ 3 }>
      <Grid item xs={ 12 }>
        <Paper className={ classes.paper }>
          <Header
            title="Список организаций"
            size="30px"
            fontWeight="700"
            color={ grey[900] }
          />
          { districtData.area_id || villageData.area_id ? (<Button variant="contained" className={ `${classes.button} ${classes.bckColor}` } onClick={ handleClickOpen } color="primary">
            Добавить организацию
          </Button>) : <ListOrganizationSkeleton /> }
          <ListItems withDialog={ true } listData={ organizationsByPlace } />
        </Paper>
      </Grid>
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
                {
                  organizations && organizations.map((organization) => {
                    return (
                      <List
                        component="nav"
                        className={ classes.list }
                        key={ organization.organization_id }
                      >
                        <ListItem button>{ organization.organization_name }</ListItem>
                        <Checkbox
                          checked={ orgIds.includes(organization.organization_id) }
                          onChange={ handleCheckboxChange }
                          value={ organization.organization_id }
                          inputProps={ { 'aria-label': 'primary checkbox' } }
                        />
                      </List>
                    );
                  })
                }
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
            Отменить
          </Button>
          <Button onClick={ handleAddOrganization } color="primary" autoFocus>
            Применить
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

ListOrganizations.propTypes = {
  getOrganizationByVillageAction: PropTypes.func.isRequired,
  getOrganizationByCityAction: PropTypes.func.isRequired,
  loadOrganizations: PropTypes.func.isRequired,
  organizationsByPlace: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  organizationsByPlace: state.organizationReducer.organizationsByPlace,
  organizations: state.organizationReducer.organizations,
});

export default connect(mapStateToProps, { getOrganizationByVillageAction, getOrganizationByCityAction, addOrganizationToPlaceAction, loadOrganizations })(ListOrganizations);
