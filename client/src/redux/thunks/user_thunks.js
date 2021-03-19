import {userAPI} from '../../api/api';
import {actionsUser} from '../actions/actions_user';

export const userThunks = {
  login: (login, password) => async (dispatch) => {
    let data = await userAPI.login(login, password);
    if (data.error) {
      dispatch(actionsUser.setError(data.error));
    } else {
      await dispatch(actionsUser.setAuthorized(data.verify));
    }
    console.log(data);
    //dispatch(todosActions.setAllTodos(data));
  },
};
