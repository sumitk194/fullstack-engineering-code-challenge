import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from '@/components/Loading';
import PrivateRoute from '@/routes/PrivateRoute';

import './App.scss';

const Scanning = React.lazy(() => import('./modules/Scanning'));

export default () => (
  <BrowserRouter>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <PrivateRoute path="/scan" name="Scanning" component={Scanning} />
        <Redirect to="scan" />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);
