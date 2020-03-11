import React from 'react';
import { notificationEvents } from '../../constants';

import './notification.css';

const Notification = ({ notification = {} }) => {
  return(
      <div styleName="notification">{notification.username} {notificationEvents[notification.type]}</div>
  )
};

export default Notification;