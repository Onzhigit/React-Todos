import { LOAD_ORGANIZATIONS, ADD_ORGANIZATION, UPDATE_ORGANIZATION, DELETE_ORGANIZATION, GET_ORGANIZATION_BY_VILLAGE, GET_ORGANIZATION_BY_CITY, ADD_ORGANIZATION_TO_PLACE, ADD_SERVICES_TO_ORGANIZATION, LOAD_ADDED_SERVICES_TO_ORGANIZATION, DELETE_SERVICES_FROM_ORGANIZATION, LOAD_EMPLOYEES_OF_ORGANIZATION, ADD_EMPLOYEE_TO_ORGANIZATION, DELETE_EMPLOYEE_FROM_ORGANIZATION, UPDATE_EMPLOYEE_OF_ORGANIZATION, GET_EMPLOYEES_BY_ORG_ID, CLEAR_ORGANIZATION_BY_PLACE } from '../actions/types';

const initialState = {
  organizations: [],
  organizationsByPlace: [],
  organization: null,
  servicesByOrganization: [],
  employeesByOrganization: [],
  employeesByOrgId: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  //console.log(payload);

  switch (type) {
    case LOAD_ORGANIZATIONS:
      return {
        ...state,
        organizations: payload
      };
    case ADD_ORGANIZATION:
      return {
        ...state,
        organizations: [...state.organizations, payload]
      };
    case UPDATE_ORGANIZATION:
      return {
        ...state,
        organizations: [...state.organizations.filter(evt => evt.id !== payload.id), payload]
      };
    case DELETE_ORGANIZATION:
      return {
        ...state,
        organizations: [...state.organizations.filter(organization => organization.id !== payload)]
      };
    case GET_ORGANIZATION_BY_VILLAGE:
      return {
        ...state,
        organizationsByPlace: payload
      };
    case GET_ORGANIZATION_BY_CITY:
      return {
        ...state,
        organizationsByPlace: payload
      };
    case ADD_ORGANIZATION_TO_PLACE:
      return {
        ...state,
        organizationsByPlace: payload
      };
    case LOAD_ADDED_SERVICES_TO_ORGANIZATION:
      return {
        ...state,
        servicesByOrganization: payload
      };
    case ADD_SERVICES_TO_ORGANIZATION:
      return {
        ...state,
        servicesByOrganization: [...state.servicesByOrganization, payload]
      };
    case DELETE_SERVICES_FROM_ORGANIZATION:
      return {
        ...state,
        servicesByOrganization: [...state.servicesByOrganization.filter(service => service.id !== payload)]
      };
    case LOAD_EMPLOYEES_OF_ORGANIZATION:
      return {
        ...state,
        employeesByOrganization: payload
      };
    case ADD_EMPLOYEE_TO_ORGANIZATION:
      return {
        ...state,
        employeesByOrganization: [...state.employeesByOrganization, payload]
      };
    case DELETE_EMPLOYEE_FROM_ORGANIZATION:
      return {
        ...state,
        employeesByOrganization: [...state.employeesByOrganization.filter(employee => employee.id !== payload)]
      };
    case UPDATE_EMPLOYEE_OF_ORGANIZATION:
      return {
        ...state,
        employeesByOrganization: [...state.employeesByOrganization.filter(employee => employee.id !== payload.id), payload.data]
      };
    case GET_EMPLOYEES_BY_ORG_ID:
      return {
        ...state,
        employeesByOrgId: payload
      };
    case CLEAR_ORGANIZATION_BY_PLACE:
      return {
        ...state,
        organizationsByPlace:[]
      }
    default:
      return state;
  }
}







