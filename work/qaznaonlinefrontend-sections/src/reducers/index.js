import { combineReducers } from 'redux';
import organizationReducer from './organization';
import serviceReducer from './service';
import regionReducer from './regions';
import alertReducer from './alert';
import utilsStateReducer from './utilsState';
import adminUsersReducer from './admin-user'
import authReducer from './auth';

export default combineReducers({ 
    organizationReducer, 
    serviceReducer, 
    regionReducer, 
    utilsStateReducer, 
    alertReducer, 
    authReducer, 
    adminUsersReducer, 
    });