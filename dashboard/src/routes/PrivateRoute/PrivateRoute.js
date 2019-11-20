import React from 'react';
import { Route } from 'react-router-dom';

import MasterLayout from '@/layouts/MasterLayout';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <MasterLayout>
        <Component {...matchProps} />
      </MasterLayout>
    )}
  />
);

export default PrivateRoute;
