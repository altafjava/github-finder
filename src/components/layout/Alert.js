import React from 'react';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i class='fas fa-exclamation-triangle' /> {alert.msg}
      </div>
    )
  );
};

export default Alert;
