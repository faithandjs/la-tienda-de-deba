import React from 'react';
import { Context } from './context';

import { ToastContainer } from 'react-toastify';

const CombinedProvider = ({ element }: any) => {
  return (
    <Context>
      <>
        <ToastContainer />
        {element}
      </>
    </Context>
  );
};

export default CombinedProvider;
