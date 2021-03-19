import React from 'react';
import {connect} from 'react-redux';
import s from './Header.module.scss';

function Header({authorized}) {
  console.log(authorized);
  return <div className={s.header}>TODO APP</div>;
}

const mapStateToProps = (state) => ({
  authorized: state.userPage.authorized,
});

export default connect(mapStateToProps, null)(Header);
