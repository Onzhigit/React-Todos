import { Redirect } from 'react-router-dom';
import { setAlertAction } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_USER, LOGOUT_USER } from './types';


// register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch('https://apitst.qaznaonline.kz/cda/auth/register', config);
    let data = await res.json();
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      REGISTER_FAIL
    });
  }
};

export const loginAction = (username, password) => async dispatch => {
  const config = {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (username && password) {
      const res = await fetch('https://apitst.qaznaonline.kz/cda/auth/adn/login', config);
      let data = await res.json();
      if (res.status >= 400) {
        dispatch(
          setAlertAction('введите правильный ИИН или Пароль', 'warning')
        );
        return <Redirect to="/signin" />;
      }
      dispatch({
        type: LOGIN_USER,
        payload: data
      });
    }
  } catch (error) {
    console.log(error);
  }
};



export const logoutUserAction = () => dispatch => {
  try {
    dispatch({
      type: LOGOUT_USER
    });
  } catch (error) {
    console.log(error);
  }
};