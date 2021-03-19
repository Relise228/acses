import {actionsTypeUser} from './actions_type_user';

export const actionsUser = {
  setUserData: (user) => ({
    type: actionsTypeUser.SET_USER_DATA,
    payload: user,
  }),
  setAuthorized: (auth) => ({
    type: actionsTypeUser.SET_AUTHORIZED,
    payload: auth,
  }),
  setError: (error) => ({
    type: actionsTypeUser.SET_ERROR,
    payload: error,
  }),
};
