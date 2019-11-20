import notification from 'antd/lib/notification';

export default function showNotification({
  message = '',
  description = '',
  type = 'info',
  placement = 'topRight',
  duration = 5,
  ...rest
}) {
  const obj = {
    message,
    type,
    description,
    placement,
    duration,
    ...rest,
  };

  notification[type]({
    ...obj,
  });
}
