import CombinedProvider from './src/context/combinedProvider';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStylesServer, ServerStyles } from '@mantine/ssr';

// optional: you can provide your cache as a first argument in createStylesServer function
const stylesServer = createStylesServer();

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  // const newbody =
  const html = renderToString(bodyComponent);
  setHeadComponents([ServerStyles({ html, server: stylesServer })]);
  replaceBodyHTMLString(html);
};
export const wrapRootElement = CombinedProvider;
