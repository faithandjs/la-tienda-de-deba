import { showNotification } from '@mantine/notifications';
import err from '../assets/images/error.svg';

const notification = ({
  message,
  id,
}: {
  message: string;
  id: 'error' | 'success';
}) => {
  console.log('here', message, id);
  return showNotification({
    styles: (theme) => ({
      root: {
        backgroundColor: theme.white,
        borderColor: id === 'error' ? theme.colors.red : theme.colors.green,
        '&::before': {
          opacity: 0.3,
          backgroundColor:
            id === 'error' ? theme.colors.red : theme.colors.green,
          width: '100%',
          height: '100%',
          // top: 0,
          // bottom: 0,
          // left: 0,
          // right: 0,
        },
        '.__mantine-ref-icon': {
          backgroundColor: 'unset',
        },
      },
    }),
    message: message,
    icon: id === 'error' ? <img src={err} alt="error" /> : <></>,
    autoClose: false,
  });
};

export default notification;

// icon: id === 'error' ? 'red' : 'green',
