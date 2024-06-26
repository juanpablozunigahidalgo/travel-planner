import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

ReactDOM.render(
  <Auth0Provider
    domain={domain!}
    clientId={clientId!}
    authorizationParams={{ redirect_uri: redirectUri! }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
