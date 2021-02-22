import { LOAD_REGIONS, ADD_REGION, DELETE_REGION, UPDATE_REGION } from './types';
import axios from 'axios';
import { TOKEN_NAZIM } from '../utils';

// load regions
export const loadRegionsAction = () => async dispatch => {
  //console.log('load regions is called');
  try {
    const res = await axios.get(`https://apitst.qaznaonline.kz/cda/api/v1/location`,
      {
        headers: { Authorization: TOKEN_NAZIM }
      });

    dispatch({
      type: LOAD_REGIONS,
      payload: res.data.results
    });
  } catch (error) {
    console.log(error);
  }
};

// add regions
export const addRegionAction = (data) => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM }
    };
    const res = await axios.post(`https://apitst.qaznaonline.kz/cda/api/v1/location`,
      data, config
    );
    dispatch({
      type: ADD_REGION,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

// delete region
export const deleteRegionAction = (id, level, history) => async dispatch => {
  //console.log(id,level);
  try {
    await axios.delete(`https://apitst.qaznaonline.kz/cda/api/v1/location/${id}`, {
      headers: {
        Authorization: TOKEN_NAZIM, "Content-Type": "application/json"
      }, data: { "location_type": level }
    });
    dispatch({
      type: DELETE_REGION,
      payload: id
    });
    history.push('/')
  } catch (error) {
    console.log(error);
  }
};

// update region
export const updateRegionAction = (id, data) => async dispatch => {
  try {
    const config = {
      headers: { Authorization: TOKEN_NAZIM }
    };
    const res = await axios.put(`https://apitst.qaznaonline.kz/cda/api/v1/location/${id}`, data, config);
    dispatch({
      type: UPDATE_REGION,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};