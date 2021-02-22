import { LOGIN_USER, LOGOUT_USER } from '../actions/types';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: !!Cookies.get('userCookie'),
  loading: true
};

export default function Auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      Cookies.set('userCookie', payload.access_token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT_USER:
      Cookies.remove('userCookie');
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}

