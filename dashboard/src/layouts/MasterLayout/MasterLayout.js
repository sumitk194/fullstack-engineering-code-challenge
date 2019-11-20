import React, { Suspense } from 'react';
import { Container } from 'reactstrap';
import { AppFooter, AppHeader } from '@coreui/react';

import Animation from '@/components/Animation';
import Loading from '@/components/Loading';

const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

export default props => {
  const { children } = props;
  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense>
          <Header />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <main className="main">
          <Animation>
            <Container fluid>{children}</Container>
          </Animation>
        </main>
      </div>
      <AppFooter>
        <Suspense fallback={<Loading />}>
          <Footer />
        </Suspense>
      </AppFooter>
    </div>
  );
};
