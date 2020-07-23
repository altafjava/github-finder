import React, { useReducer } from 'react';
import { REMOVE_ALERT, SET_ALERT } from '../types';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Show Alert

  const showAlert = (msg, type) => {
    dispatch({ type: SET_ALERT, payload: { msg, type } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        showAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
