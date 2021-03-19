import {constants, stat} from 'fs';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router';
import {todosThunks} from '../../redux/thunks/todos_thunks';
import {userThunks} from '../../redux/thunks/user_thunks';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import MainPage from '../MainPage/MainPage';
import TodoPage from '../TodoPage/TodoPage';
import UserPage from '../UserPage/UserPage';
import Wrapper from '../Wrapper/Wrapper';
import s from './App.module.scss';

function App({authorized, loginFunc}) {
  const [modal, setModal] = useState(false);

  const onShowModal = () => {
    setModal(true);
  };
  const onHideModal = () => {
    setModal(false);
  };
  const onLogin = async ({login, password}) => {
    await loginFunc(login, password);
  };

  return (
    <div className={s.app}>
      <Header />
      {authorized ? (
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/todo' component={TodoPage} />
          <Route exact path='/user' component={UserPage} />
        </Switch>
      ) : (
        <Wrapper center>
          <button className={s.loginButton} onClick={onShowModal}>
            Log In
          </button>
        </Wrapper>
      )}
      {modal && !authorized && (
        <LoginForm onClose={onHideModal} onSubmit={onLogin} />
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAllTodos: () => dispatch(todosThunks.getAllTodos()),
  loginFunc: (login, password) => dispatch(userThunks.login(login, password)),
});

const mapStateToProps = (state) => ({
  authorized: state.userPage.authorized,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
