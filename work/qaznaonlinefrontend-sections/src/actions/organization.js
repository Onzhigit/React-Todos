import axios from 'axios';
import { LOAD_ORGANIZATIONS, ADD_ORGANIZATION, UPDATE_ORGANIZATION, DELETE_ORGANIZATION, GET_ORGANIZATION_BY_VILLAGE, GET_ORGANIZATION_BY_CITY, ADD_ORGANIZATION_TO_PLACE, ADD_SERVICES_TO_ORGANIZATION, LOAD_ADDED_SERVICES_TO_ORGANIZATION, DELETE_SERVICES_FROM_ORGANIZATION, DELETE_EMPLOYEE_FROM_ORGANIZATION, UPDATE_EMPLOYEE_OF_ORGANIZATION, GET_EMPLOYEES_BY_ORG_ID } from './types';
import { SERVER_URL, TOKEN_NAZIM } from '../utils';
//import { v4 as uuidv4 } from 'uuid';


// load organizations
export const loadOrganizations = () => async dispatch => {
  try {
    const res = await axios.get(`https://apitst.qaznaonline.kz/cda/api/v1/organizations`,
      {
        headers: { Authorization: TOKEN_NAZIM }
      });

    dispatch({
      type: LOAD_ORGANIZATIONS,
      payload: res.data.results
    });
  } catch (error) {
    console.log(error);
  }
};

// add organizations
export const addOrganization = (data) => async dispatch => {
  console.log(data);
  try {
    //console.log(organization);
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };

    const res = await axios.post(`${SERVER_URL}/api/v1/org`, data, config);
    dispatch({
      type: ADD_ORGANIZATION,
      payload: res.data
    });
    //setOrganizationIsAdded(true)
  } catch (error) {
    console.log(error);
  }
};

// update organizations
export const updateOrganizationAction = (data, id) => async dispatch => {
  //console.log(data);
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };
    //console.log(organization);
    const res = await axios.put(`${SERVER_URL}/api/v1/org/${id}`, data, config);
    //console.log(res.data);
    dispatch({
      type: UPDATE_ORGANIZATION,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrganizationAction = (id) => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };

    await axios.delete(`${SERVER_URL}/api/v1/org/${id}`, config);
    dispatch({
      type: DELETE_ORGANIZATION,
      payload: id
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOrganizationByVillageAction = (villageId) => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };

    // provide organization id
    if (villageId) {
      const res = await axios.get(`https://apitst.qaznaonline.kz/cda/api/v1/organizations?location=${villageId}&location_status=area2`, config);
      dispatch({
        type: GET_ORGANIZATION_BY_VILLAGE,
        payload: res.data.results
      });
    }

  } catch (error) {
    console.log(error);
  }
};

export const getOrganizationByCityAction = (cityId) => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };

    // provide organization id
    if (cityId) {
      const res = await axios.get(`https://apitst.qaznaonline.kz/cda/api/v1/organizations?location=${cityId}&location_status=area1`, config);
      dispatch({
        type: GET_ORGANIZATION_BY_CITY,
        payload: res.data.results
      });
    }

  } catch (error) {
    console.log(error);
  }
};

/* export const resetOrgainzationPlaceAction = (type, ids) =>async (dispatch) => {

} */

export const addOrganizationToPlaceAction = (type, ids, districtId, villageId) => async dispatch => {
  if (type === "type_1") {
    try {
      const config = {
        headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
      };
      //console.log(organization);
      const data =
      {
        "area_id": districtId,
        "area_status": "area1"
      };
      // provide organization id
      for (let i = 0; i < ids.length; i++) {
        const res = await axios.put(`https://apitst.qaznaonline.kz/cda/api/v1/organizations/${ids[i]}`, data, config);
        console.log(res);
        dispatch({
          type: ADD_ORGANIZATION_TO_PLACE,
          payload: res.data.results
        });
      }
      dispatch(
        getOrganizationByCityAction(districtId)
      )
    } catch (error) {
      console.log(error);
    }
  }

  if (type === "type_2") {
    try {
      const config = {
        headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
      };
      //console.log(organization);
      const data =
      {
        "area_id": villageId,
        "area_status": "area2"
      };

      // provide organization id
      for (let i = 0; i < ids.length; i++) {
        const res = await axios.put(`https://apitst.qaznaonline.kz/cda/api/v1/organizations/${ids[i]}`, data, config);
        dispatch({
          type: ADD_ORGANIZATION_TO_PLACE,
          payload: res.data.results
        });
      }
      dispatch(
        getOrganizationByVillageAction(villageId)
      )

    } catch (error) {
      console.log(error);
    }
  }
};

// test - requires API
export const loadAddedServiceToOrganzationAction = (data) => dispatch => {
  dispatch({
    type: LOAD_ADDED_SERVICES_TO_ORGANIZATION,
    payload: data
  });
};

// test - requires API
export const addServicesToOrganizationAction = (data) => dispatch => {
  //console.log(data);
  try {
    dispatch({
      type: ADD_SERVICES_TO_ORGANIZATION,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};

// test - requires API
export const deleteServicesFromOrganization = (id) => dispatch => {
  try {
    dispatch({
      type: DELETE_SERVICES_FROM_ORGANIZATION,
      payload: id
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployeeFromOrganizationAction = (id) => dispatch => {
  try {
    dispatch({
      type: DELETE_EMPLOYEE_FROM_ORGANIZATION,
      payload: id
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployeeOfOrganizationAction = (id, data) => dispatch => {
  try {
    dispatch({
      type: UPDATE_EMPLOYEE_OF_ORGANIZATION,
      payload: { id: id, data: data }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeesByOrgIdAction = (orgId) => async dispatch => {
  try {
    const res = await axios.get(`https://apitst.qaznaonline.kz/cda/api/v1/organizations-staff?organization_id=${orgId}`, {
      headers: {
        Authorization: TOKEN_NAZIM,
      },
    });

    dispatch({
      type: GET_EMPLOYEES_BY_ORG_ID,
      payload: res.data.results,
    });
  } catch (error) {
    console.log(error);
  }
};








