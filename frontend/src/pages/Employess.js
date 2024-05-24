import React, { lazy, Suspense } from 'react';

const EmployeeList = lazy(() => import('../components/Employess/EmployeeList'));

const Employees = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EmployeeList />
      </Suspense>
    </div>
  );
};

export default Employees;