import 'antd/lib/notification/style/css';

import showNotification from './showNotification';

export default class Notification {
  static showSuccessNotification = data => showNotification({ ...data, type: 'success' });

  static showErrorNotification = data => showNotification({ ...data, type: 'error' });

  static showInfoNotification = data => showNotification({ ...data, type: 'info' });

  static showWarningNotification = data => showNotification({ ...data, type: 'warning' });

  static showNotification = data => showNotification({ ...data });
}
