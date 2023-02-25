import { showNotification } from '@mantine/notifications';

const notification = ({
  message,
  type,
}: // id,
{
  message: string;
  type: 'error' | 'success';
}) => {
  console.log('here', message, type);
  return showNotification({
    styles: (theme) => ({
      root: {
        backgroundColor: theme.white,
        borderColor: type === 'error' ? theme.colors.red : theme.colors.green,
        '&::before': {
          opacity: 0.3,
          backgroundColor:
            type === 'error' ? theme.colors.red : theme.colors.green,
          width: '100%',
          height: '100%',
        },
        '.__mantine-ref-icon': {
          backgroundColor: 'unset',
        },
      },
      body: {
        // textTransform: 'capitalize',
        fontStyle: 'oblique',
      },
    }),
    message: message,
    autoClose: 3000,
  });
};

export default notification;

// icon: id === 'error' ? <img src={err} alt="error" /> : <></>,
// icon: id === 'error' ? 'red' : 'green',
