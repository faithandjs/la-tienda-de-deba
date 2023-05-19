import React from 'react';
import { NotificationsProvider } from '@mantine/notifications';

import { Context } from './context';

const CombinedProvider = ({ element }: any) => {
  return (
    <NotificationsProvider>
      <Context>
        <>{element}</>
      </Context>
    </NotificationsProvider>
  );
};

export default CombinedProvider;
