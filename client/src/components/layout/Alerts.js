import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  // looks at the alerts in context in the state
  // and if there is anything, it's going to loop through and output the <div>
  return (
    alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (     
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <i className="fas fa-info-circle" />{alert.msg}
        </div>
      ))
  );
};

export default Alerts
