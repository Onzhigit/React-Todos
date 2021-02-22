/* eslint-disable import/no-anonymous-default-export */
import { ENABLE_ADD_DIALOG_BUTTON, GET_LANGUAGES } from '../actions/types';

const initialState = {
  addButtonEnabled: false,
  languages:[]
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //console.log(payload);
  switch (type) {
    case ENABLE_ADD_DIALOG_BUTTON:
      return {
        ...state,
        addButtonEnabled:payload
      };
    case GET_LANGUAGES:
      return {
        ...state,
        languages:payload
      }
    default:
      return state;
  }
}