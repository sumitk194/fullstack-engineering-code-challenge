import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Loading from '@/components/Loading';

const ScanningList = React.lazy(() => import('./scenes/ScanningList'));
const ScanningDetail = React.lazy(() => import('./scenes/ScanningDetail'));

export default ({match: { path }}) => (
  <React.Suspense fallback={<Loading />}>
    <Switch>
      <Route path={`${path}/:id`} name="Detail" component={ScanningDetail} />
      <Route path={path} name="List" component={ScanningList} />
    </Switch>
  </React.Suspense>
);
