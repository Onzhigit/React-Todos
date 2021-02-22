import { LOAD_USERS_BY_ROLE, UPDATE_USERS_BY_ROLE, ADD_USERS_BY_ROLE, DELETE_USERS_BY_ROLE, GET_USERS_BY_ORGANZIATION_ID, GET_EGOV_SERVICE_LIST, GET_ROLES, FILTER_USERS_BY_ROLE } from '../actions/types';

const initialState = {
  usersByRole: [],
  usersByOrganization: [],
  egovServiceList: [],
  roles: [],
  filteredUsers: []
};

export default function AdminUsers(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USERS_BY_ROLE:
      return {
        ...state,
        usersByRole: payload
      };
    case UPDATE_USERS_BY_ROLE:
      return {
        ...state,
        usersByRole: payload
      };
    case ADD_USERS_BY_ROLE:
      return {
        ...state,
        usersByRole: [...state.usersByRole, payload]
      };
    case DELETE_USERS_BY_ROLE:
      return {
        ...state,
        usersByRole: payload
      };
    case GET_USERS_BY_ORGANZIATION_ID:
      return {
        ...state,
        usersByOrganization: payload
      };
    case GET_EGOV_SERVICE_LIST:
      return {
        ...state,
        egovServiceList: payload
      };
    case GET_ROLES:
      return {
        ...state,
        roles: payload
      };
    case FILTER_USERS_BY_ROLE:
      return {
        ...state,
        filteredUsers: payload
      };
    default:
      return state;
  }
}