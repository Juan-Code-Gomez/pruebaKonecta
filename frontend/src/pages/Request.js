import React, { lazy, Suspense } from 'react';

const RequestList = lazy(() => import('../components/Request/RequestList'));

const Requests = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RequestList />
      </Suspense>
    </div>
  );
};

export default Requests;