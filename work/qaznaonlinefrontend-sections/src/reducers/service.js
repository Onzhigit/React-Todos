import { LOAD_SERVICES, ADD_SERVICE, DELETE_SERVICE, UPDATE_SERVICE, GET_KIDS_AGE_GROUP,CREATE_TIMETABLE_FOR_EMPLOYEE, 
         GET_TIMETABLE_BY_ORG_ID, DELETE_TIMETABLE_BY_ID, GET_TIMETABLE_REQUEST, GET_KIDS_GROUP, 
         GET_KIDS_GROUPS_BY_KIDS_AGE_ID, GET_WORKERS_TRANSPORT_REQUESTS } from '../actions/types';

const initialState = {
  services: [],
  service: {},
  kidsAgeGroup: [],
  loading: true,
  timeTables:[],
  timetableRequests:[],
  kidsGroup:[],
  kidsGroupsByKidsAgeId:[],
  workersTransportRequests: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  //console.log(payload);

  switch (type) {
    case LOAD_SERVICES:
      return {
        ...state,
        services: payload,
        loading: false
      };
    case ADD_SERVICE:
      return {
        ...state,
        service: payload
      };
    case DELETE_SERVICE:
      return {
        ...state,
        services: [...state.services.filter(service => service.id !== payload)]
      };
    case UPDATE_SERVICE:
      return {
        ...state,
        service: payload
      };
    case GET_KIDS_AGE_GROUP:
      return {
        ...state,
        kidsAgeGroup: payload
      };
    case CREATE_TIMETABLE_FOR_EMPLOYEE:
      return {
        ...state,
        timeTables:[...state.timeTables]
      }
    case GET_TIMETABLE_BY_ORG_ID:
      return {
        ...state,
        timeTables:payload
      }
    case DELETE_TIMETABLE_BY_ID:
      return {
        ...state,
        timeTables:[...state.timeTables.filter(timetable => timetable.service_timetable_id !== payload)]
      }
    case GET_TIMETABLE_REQUEST:
      return {
        ...state,
        timetableRequests:payload
      }
    case GET_KIDS_GROUP:
      return {
        ...state,
        kidsGroup:payload
      }
    case GET_KIDS_GROUPS_BY_KIDS_AGE_ID:
      return {
        ...state,
        kidsGroupsByKidsAgeId:payload
      }
    case GET_WORKERS_TRANSPORT_REQUESTS:
      return {
        ...state,
        workersTransportRequests: payload
      }
    default:
      return state;
  }
}