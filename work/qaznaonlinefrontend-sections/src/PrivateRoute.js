import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthProp, ...rest }) => (
  <Route { ...rest } render={ props => !isAuthProp ? (<Redirect to="/signin" />) : (<Component { ...props } />) } />
);

const mapStateToProps = (state) => ({
  isAuthProp: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);