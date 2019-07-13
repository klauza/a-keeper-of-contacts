import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alert.length > 0 && alertContext.alerts    // looks at the alerts in context in the state
      .map(alert => (     // and if there is anything, it's going to loop through and output the <div>
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <i className="fas fa-info-circle" />{alert.mgs}
        </div>
      ))
  )
}

export default Alerts
