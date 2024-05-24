import React, { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';

const Alert = () => {
  const { alert } = useContext(AlertContext);

  if (!alert.visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg ${
        alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {alert.message}
    </div>
  );
};

export default Alert;