import React, { lazy, Suspense } from 'react';
const RequestList = lazy(() => import('../components/Request/RequestList'));

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RequestList />
      </Suspense>
    </div>
  );
};

export default Home;