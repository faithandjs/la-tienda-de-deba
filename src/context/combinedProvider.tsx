import React from 'react';
import { Context } from './context';

import { NotificationsProvider } from '@mantine/notifications';

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
