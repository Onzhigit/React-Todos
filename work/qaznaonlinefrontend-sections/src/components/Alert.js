import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

const AlertComponent = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Alert key={ alert.id } severity={ alert.alertType }>{ alert.msg }</Alert>
    )
  );

AlertComponent.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alertReducer.alerts
});

export default connect(mapStateToProps)(AlertComponent);