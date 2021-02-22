import React, { useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import Regions from "./pages/Regions";
import ServicesPage from "./pages/Services";
import OrganizationsPage from './pages/Organizations/Organizations';
import Applications from "./pages/Applications/Applications";
import SignIn from "./pages/SignIn";
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EnableAddDialogButtonAction, clearOrganizationsByPlace } from './actions/utilsActions';
import PrivateRoute from './PrivateRoute';
import SubsidizedMealsApplications from './pages/SubsidizedMeals/Applications';
import TransportingApplications from './pages/Transporting/Applications';
import CampApplications from './pages/Camp/Applications';
import UserManagement from './pages/UserManagment/User'


const Main = ({ EnableAddDialogButtonAction, clearOrganizationsByPlace }) => {
  const location = useLocation();
  //console.log(location.pathname);
  useEffect(() => {
    checkPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Check if path is not organization page
  // If path is not /organizations then "enabledAddButton" should be false
  const checkPath = () => {
    if (location.pathname !== '/organizations') {
      //console.log(`this is ${location.pathname}`);
      EnableAddDialogButtonAction(false);
    }

    if (location.pathname !== '/') {
      clearOrganizationsByPlace();
    }
  };
  return <Switch>
    <Route path="/signin" exact component={ SignIn } />
    <PrivateRoute path="/regions" exact component={ Regions } />
    <PrivateRoute path="/sections" exact component={ ServicesPage } />
    <PrivateRoute path="/organizations" exact component={ OrganizationsPage } />
    <PrivateRoute path="/applications" component={ Applications } />
    <PrivateRoute path="/subsidizedMealsApplications" component={ SubsidizedMealsApplications } />
    <Route path="/transporting" component={ TransportingApplications } />
    <PrivateRoute path="/camp" component={ CampApplications } />
    <PrivateRoute path="/usermanagement" component={ UserManagement } />
  </Switch>;
};

Main.propTypes = {
  EnableAddDialogButtonAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { EnableAddDialogButtonAction, clearOrganizationsByPlace })(Main);
