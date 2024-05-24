import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { AlertContext } from '../../context/AlertContext';

const EmployeeForm = ({ onClose, onEmployeeCreated }) => {
  const [employee, setEmployee] = useState({ name: '', position: '', hire_date: '', salary: '' });
  const { showAlert } = useContext(AlertContext);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/employees', employee);
      onEmployeeCreated(); // Llama a la función para actualizar la lista de empleados
      onClose(); // Cierra el modal
      showAlert('Empleado creado correctamente', 'success');
    } catch (error) {
      console.error('Failed to create employee:', error);
      showAlert('No se pudo crear el empleado', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="position">Cargo</label>
        <input
          type="text"
          id="position"
          name="position"
          value={employee.position}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="hire_date">Fecha de ingreso</label>
        <input
          type="date"
          id="hire_date"
          name="hire_date"
          value={employee.hire_date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="salary">Salario</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Crear Empleado
      </button>
    </form>
  );
};

export default EmployeeForm;