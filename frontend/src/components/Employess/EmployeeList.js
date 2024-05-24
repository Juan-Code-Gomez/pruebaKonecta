import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import EmployeeForm from "./EmployeeForm";
import { AuthContext } from "../../context/AuthContext";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpenEmployee, setIsModalOpenEmployee] = useState(false);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const fetchEmployees = async (page = 1) => {
    try {
      const response = await api.get(`/employees?page=${page}`);
      setEmployees(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      setError("An error occurred while fetching employees.");
    }
  };

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const openModal = () => setIsModalOpenEmployee(true);
  const closeModal = () => setIsModalOpenEmployee(false);

  const handleEmployeeCreated = () => {
    fetchEmployees(currentPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Empleados</h2>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => navigate("/requests")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Solicitudes
        </button>
        {auth.role === "admin" && (
          <button
            onClick={openModal}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Crear Empleado
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nomnbre</th>
              <th className="py-2 px-4 border-b">Cargo</th>
              <th className="py-2 px-4 border-b">Fecha ingreso</th>
              <th className="py-2 px-4 border-b">Salario</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="py-2 px-4 border-b">{employee.name}</td>
                <td className="py-2 px-4 border-b">{employee.position}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(employee.hire_date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Atras
        </button>
        <span>
          Pagina {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {isModalOpenEmployee && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
            <EmployeeForm
              onClose={closeModal}
              onEmployeeCreated={handleEmployeeCreated}
            />
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
