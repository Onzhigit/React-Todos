import { LOAD_REGIONS, ADD_REGION, DELETE_REGION, UPDATE_REGION } from '../actions/types';

const initialState = {
  regions: [],
  region: null,
  loading: true
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  //console.log(payload);

  switch (type) {
    case LOAD_REGIONS:
      return {
        ...state,
        regions: payload,
        loading:false
      };
    case ADD_REGION:
      return {
        ...state,
        region: payload
      };
    case DELETE_REGION:
      return {
        ...state,
        regions: [...state.regions.filter(region => region.id !== payload)]
      };
    case UPDATE_REGION:
      return {
        ...state,
        regions: payload
      };
    default:
      return state;
  }
}