import { LOAD_SERVICES, ADD_SERVICE, DELETE_SERVICE, UPDATE_SERVICE, GET_KIDS_AGE_GROUP, CREATE_TIMETABLE_FOR_EMPLOYEE, 
         GET_TIMETABLE_BY_ORG_ID, DELETE_TIMETABLE_BY_ID, UPDATE_TIMETABLE_BY_ID, GET_TIMETABLE_REQUEST, UPDATE_TIMETABLE_REQUEST, 
         GET_KIDS_GROUP, ADD_GROUP_TO_KIDS_AGE_GROUP, DELETE_GROUP_FROM_KIDS_AGE_GROUP, UPDATE_GROUP_OF_KIDS_AGE_GROUP, 
         GET_KIDS_GROUPS_BY_KIDS_AGE_ID, GET_WORKERS_TRANSPORT_REQUESTS } from './types';
import axios from 'axios';
import { TOKEN_NAZIM } from '../utils';

// load service
export const loadServicesAction = () => async dispatch => {
  try {
    const res = await axios.get(`https://apitst.qaznaonline.kz/adn/api/v1/sections`,
      {
        headers: { Authorization: TOKEN_NAZIM }
      });

    dispatch({
      type: LOAD_SERVICES,
      payload: res.data.results
    });
  } catch (error) {
    console.log(error);
  }
};

// add service
export const addServiceAction = (data) => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };

    const res = await axios.post(`https://apitst.qaznaonline.kz/adn/api/v1/sections`, data, config);

    dispatch({
      type: ADD_SERVICE,
      payload: res.data
    });
    dispatch(
      loadServicesAction()
    )
  } catch (error) {
    console.log(error);
  }
};

// delete service
export const deleteServiceAction = (id, level) => async dispatch => {
  try {

    await axios.delete(`https://apitst.qaznaonline.kz/adn/api/v1/sections/${id}`, {
      headers: {
        Authorization: TOKEN_NAZIM, "Content-Type": "application/json"
      }, data: { "section_type": level }
    });
    dispatch({
      type: DELETE_SERVICE,
      payload: id
    });
    dispatch(
      loadServicesAction()
    )
  } catch (error) {
    console.log(error);
  }
};

// update sections
export const updateSectionAction = (id, data) => async dispatch => {
  //console.log(data);
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };
    //console.log(organization);
    const res = await axios.put(`https://apitst.qaznaonline.kz/adn/api/v1/sections/${id}`, data, config);
    //console.log(res.data);
    dispatch({
      type: UPDATE_SERVICE,
      payload: res.data
    });
    dispatch(
      loadServicesAction()
    )
  } catch (error) {
    console.log(error);
  }
};

// get kids age group
export const getKidsAgeGroupAction = () => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };
    let res = await fetch(`https://apitst.qaznaonline.kz/adn/api/v1/kids-age-group-list`, config);
    let data = await res.json();
    dispatch({
      type: GET_KIDS_AGE_GROUP,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTimetableByOrgIdAction = (id) => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };
    if (id) {
      let res = await fetch(`https://apitst.qaznaonline.kz/adn/api/v1/service-timetable?organizations_id=${id}`, config);
      let data = await res.json();
      dispatch({
        type: GET_TIMETABLE_BY_ORG_ID,
        payload: data.timetable_list
      });
    }

  } catch (error) {
    console.log(error);
  }
};

export const createTimetableForEmployeeAction = (data) => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };
    await axios.post(`https://apitst.qaznaonline.kz/adn/api/v1/service-timetable`, data, config);
    dispatch({
      type: CREATE_TIMETABLE_FOR_EMPLOYEE
    });
    dispatch(
      getTimetableByOrgIdAction(data.organizations_id)
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteTimetableByIdAction = (id) => async dispatch => {
  try {
    await axios.delete(`https://apitst.qaznaonline.kz/adn/api/v1/service-timetable`, {
      headers: {
        Authorization: TOKEN_NAZIM, "Content-Type": "application/json"
      }, data: [{ "service_timetable_id": id }]
    });
    dispatch({
      type: DELETE_TIMETABLE_BY_ID,
      payload: id
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTimetableAction = (data) => async dispatch => {
  //console.log(data);
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };
    await axios.put(`https://apitst.qaznaonline.kz/adn/api/v1/service-timetable`, data, config);
    dispatch({
      type: UPDATE_TIMETABLE_BY_ID
    });
    dispatch(
      getTimetableByOrgIdAction(data.organizations_id)
    );
  } catch (error) {
    console.log(error);
  }
};

// get timetable application for service from users
export const getTimetableRequest = () => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM, "Content-Type": "application/json" }
    };
    const res = await fetch("https://apitst.qaznaonline.kz/adn/api/v1/section-request", config);
    const data = await res.json();
    dispatch({
      type: GET_TIMETABLE_REQUEST,
      payload: data.results
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateApplicationRequest = (sections_requests_id, status_type, status_user_id) => async dispatch => {
  /* console.log({
    'sections_requests_id':sections_requests_id,
    'status_type':status_type,
    'status_user_id':status_user_id
  }); */
  try {
    const config = {
      method: "PUT",
      body: JSON.stringify({ sections_requests_id, status_type, status_user_id }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch("https://apitst.qaznaonline.kz/adn/api/v1/section-request", config);
    dispatch({
      type: UPDATE_TIMETABLE_REQUEST
    });
    dispatch(
      getTimetableRequest()
    );
  } catch (error) {
    console.log(error);
  }
};

export const getKidsGroupAction = () => async dispatch => {
  try {
    const res = await fetch('https://apitst.qaznaonline.kz/adn/api/v1/kids-group');
    const data = await res.json();
    dispatch({
      type: GET_KIDS_GROUP,
      payload: data.result
    });
  } catch (error) {
    console.log(error);
  }
};

export const addGroupToKidsAgeGroupAction = (group_name, kids_age_group_id) => async dispatch => {
  const config = {
    method: "POST",
    body: JSON.stringify({ group_name, kids_age_group_id }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (kids_age_group_id) {
      const res = await fetch(
        `https://apitst.qaznaonline.kz/adn/api/v1/kids-group?kids_id=${kids_age_group_id}`,
        config
      );
      let data = await res.json();
      dispatch({ type: ADD_GROUP_TO_KIDS_AGE_GROUP, payload: data });
      dispatch(
        getKidsGroupAction()
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteGroupFromKidsAgeGroupAction = (group_id) => async dispatch => {
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await fetch(`https://apitst.qaznaonline.kz/adn/api/v1/kids-group?kids_group_id=${group_id}`, config);
    dispatch({
      type: DELETE_GROUP_FROM_KIDS_AGE_GROUP
    });
    dispatch(
      getKidsGroupAction()
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateGroupOfKidsAgeGroup = (group_id, group_name, kids_age_group_id) => async dispatch => {
  const config = {
    method: "PUT",
    body: JSON.stringify({ group_name, kids_age_group_id }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await fetch(`https://apitst.qaznaonline.kz/adn/api/v1/kids-group?kids_group_id=${group_id}`, config);
    dispatch({
      type: UPDATE_GROUP_OF_KIDS_AGE_GROUP
    });
    dispatch(
      getKidsGroupAction()
    );
  } catch (error) {
    console.log(error);
  }
};

export const getKidsGroupsByKidsAgeGroupId = (id) => async dispatch => {
  try {
    if (id) {
      const res = await fetch(`https://apitst.qaznaonline.kz/adn/api/v1/kids-group?kids_age_groups_id=${id}`);
      const data = await res.json();
      dispatch({
        type: GET_KIDS_GROUPS_BY_KIDS_AGE_ID,
        payload: data.result
      });
    }
  } catch (error) {
    console.log(error);
  }
};


export const getWorkersTransportRequests = () => async dispatch => {
  try {    
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data = await res.json();
      console.log(data);
      dispatch({
        type: GET_WORKERS_TRANSPORT_REQUESTS,
        payload: data.results
      });  
  } catch (error) {
    console.log(error);
  }
}
