import { LOAD_USERS_BY_ROLE, UPDATE_USERS_BY_ROLE, ADD_USERS_BY_ROLE, DELETE_USERS_BY_ROLE, GET_USERS_BY_ORGANZIATION_ID, GET_EGOV_SERVICE_LIST, GET_ROLES, FILTER_USERS_BY_ROLE } from './types';
import { v4 as uuidv4 } from 'uuid';
//import { TOKEN_NAZIM } from '../utils';

export const loadUsersByRoleAction = () => dispatch => {
  const usersByRole = [
    {
      name: 'Турдиев Назим',
      company: 'JSOFT',
      role: 'no-role',
      id: uuidv4()
    },
    {
      name: 'Сариев Дархан',
      company: 'Suncar',
      role: 'no-role',
      id: uuidv4()
    }, {
      name: 'Сорин Игорь',
      company: 'Dodge',
      role: 'no-role',
      id: uuidv4()
    }, {
      name: 'Майк Пампео',
      company: 'Digital',
      role: 'no-role',
      id: uuidv4()
    }
  ];
  try {
    dispatch({
      type: LOAD_USERS_BY_ROLE,
      payload: usersByRole
    });
  } catch (error) {
    console.log(error);
  }
};

export const addUserByRoleAction = (data) => dispatch => {
  //console.log('it is called here', data);
  try {
    dispatch({
      type: ADD_USERS_BY_ROLE,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserByRoleaction = (data) => dispatch => {
  try {
    dispatch({
      type: DELETE_USERS_BY_ROLE,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsersByOrganizationId = (orgId, token) => async dispatch => {
  try {
    const config = {
      headers: { Authorization: token, "Content-Type": "application/json" }
    };

    if (orgId) {
      const res = await fetch(`https://apitst.qaznaonline.kz/cda/api/v1/organizations-users?organizations_id=${orgId}`, config);
      const data = await res.json();
      dispatch({
        type: GET_USERS_BY_ORGANZIATION_ID,
        payload: data.results
      });
    }

  } catch (error) {
    console.log(error);
  }
};


export const getEgovServices = (token) => async dispatch => {
  try {
    /* const config = {
      headers: { Authorization: token, "Content-Type": "application/json" }
    }; */
    const res = await fetch(`https://apitst.qaznaonline.kz/adn/api/v1/egov-services-list`);
    const data = await res.json();
    dispatch({
      type: GET_EGOV_SERVICE_LIST,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRolesAction = () => async dispatch => {
  try {
    const res = await fetch(`https://apitst.qaznaonline.kz/adn/api/v1/roles`);
    const data = await res.json();
    dispatch({
      type: GET_ROLES,
      payload: data.results
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUsersByRoleAction = (data) => async dispatch => {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(`https://apitst.qaznaonline.kz/adn/api/v1/user-roles`, config);
  try {
    dispatch({
      type: UPDATE_USERS_BY_ROLE
    });
  } catch (error) {
    console.log(error);
  }
};

export const filterUsersByRoleAction = (roleId) => async dispatch => {
  //console.log(roleId);
  try {
    const res = await fetch(`https://apitst.qaznaonline.kz/adn/api/v1/user-roles?role_id=${roleId}`);
    const data = await res.json();
    //console.log(data);
    dispatch({
      type: FILTER_USERS_BY_ROLE,
      payload: data.results
    });
  } catch (error) {
    console.log(error);
  }
};