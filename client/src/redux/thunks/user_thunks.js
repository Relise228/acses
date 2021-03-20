import {userAPI} from '../../api/api';
import {actionsUser} from '../actions/actions_user';

export const userThunks = {
  login: (login, password) => async (dispatch) => {
    let data = await userAPI.login(login, password);
    if (data.error) {
      dispatch(actionsUser.setError(data.error));
    } else {
      await dispatch(actionsUser.setAuthorized(data.verify));
      sessionStorage.setItem('authorized', true);
    }
  },
  getUser: () => async (dispatch) => {
    let data = await userAPI.getUser();
    dispatch(actionsUser.setUserData(data));
  },
  updateUser: (login, password, firstName, lastName, icon) => async (
    dispatch
  ) => {
    let data = await userAPI.updateUser(
      login,
      password,
      firstName,
      lastName,
      icon
    );
    dispatch(actionsUser.setUserData(data));
  },
};
