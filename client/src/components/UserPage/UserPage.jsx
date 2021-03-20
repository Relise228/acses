import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {userThunks} from '../../redux/thunks/user_thunks';
import EditUserForm from '../EditUserForm/EditUserForm';
import Wrapper from '../Wrapper/Wrapper';
import s from './UserPage.module.scss';

function UserPage({user, getUser, updateUser}) {
  const [editMode, setEditMode] = useState(false);

  const onSubmit = async (formData) => {
    const {login, password, firstName, lastName, icon} = formData;
    await updateUser(login, password, firstName, lastName, icon);
    setEditMode(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={s.userPage}>
      <Wrapper>
        <div className={s.userPageWrapper}>
          {!editMode ? (
            <div className={s.userPageLeft}>
              <div className={s.userPageAbout}>
                <img src={user.icon} alt='icon' />
                <div className={s.userPageAboutWrapper}>
                  <div className={s.userPageAboutLogin}>{user.login}</div>
                  <div className={s.userPageAboutName}>
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              </div>
              <div className={s.userPageStats}>
                <div className={s.userPageStatsTop}>
                  <div className={s.userPageStatsData}>
                    Created Todo
                    <br />
                    <div style={{fontSize: 50}}>{user.createdTodo}</div>
                  </div>
                  <div className={s.userPageStatsData}>
                    Deleted Todo <br />
                    <div style={{fontSize: 50}}>{user.deletedTodo}</div>
                  </div>
                </div>
                <div className={s.userPageStatsBottom}>
                  <div className={s.userPageStatsData}>
                    Active Todo <br />
                    <div style={{fontSize: 50}}>{user.activeTodo}</div>
                  </div>
                  <div className={s.userPageStatsData}>
                    <div>
                      Closed Todo <br />
                    </div>
                    <div style={{fontSize: 50}}>{user.closedTodo}</div>
                  </div>
                </div>
              </div>
              <div className={s.userPageButtonWrapper}>
                <button
                  className={s.userPageButton}
                  onClick={() => setEditMode(true)}
                >
                  CHANGE INFO
                </button>
              </div>
            </div>
          ) : (
            <EditUserForm
              onClose={() => setEditMode(false)}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </Wrapper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userPage.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(userThunks.getUser()),
  updateUser: (login, password, firstName, lastName, icon) =>
    dispatch(userThunks.updateUser(login, password, firstName, lastName, icon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
