import actions from 'redux-form/lib/actions';
import {actionsTypeUser} from '../actions/actions_type_user';

let initialState = {
  user: {},
  authorized: false,
  error: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypeUser.SET_USER_DATA:
      return {
        ...state,
        user: {...action.payload},
      };
    case actionsTypeUser.SET_AUTHORIZED:
      return {
        ...state,
        authorized: action.payload,
        error: '',
      };
    case actionsTypeUser.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
