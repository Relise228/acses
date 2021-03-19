import React from 'react';
import s from './Wrapper.module.scss';
function Wrapper({children, center}) {
  const centerr = center && {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div className={s.wrapper} style={centerr}>
      {children}
    </div>
  );
}

export default Wrapper;
