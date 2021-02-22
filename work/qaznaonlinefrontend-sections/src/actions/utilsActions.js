import { ENABLE_ADD_DIALOG_BUTTON, GET_LANGUAGES, CLEAR_ORGANIZATION_BY_PLACE } from './types';
import { TOKEN_NAZIM } from '../utils';

export const EnableAddDialogButtonAction = (bool) => dispatch => {
  dispatch({
    type: ENABLE_ADD_DIALOG_BUTTON,
    payload: bool
  });
};

export const clearOrganizationsByPlace = () => dispatch => {
  dispatch({
    type: CLEAR_ORGANIZATION_BY_PLACE
  });
};

export const getLanguagesAction = () => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };
    let res = await fetch(`http://95.56.233.237:5003/api/v1/languages`, config);
    let data = await res.json();
    dispatch({
      type: GET_LANGUAGES,
      payload: data.results
    });
  } catch (error) {
    console.log(error);
  }
};

export const setAuthToken = token => {
  if (token) {
    return;
  }
};