import React, { useEffect, useState, useContext  } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import RequestForm from "./RequestForm";
import { AuthContext } from '../../context/AuthContext'

const RequestList = () => {
  const { auth } = useContext(AuthContext); 
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchRequests = async (page = 1) => {
    try {
      const response = await api.get(`/requests?page=${page}`);
      setRequests(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      if (error.message === "Unauthorized") {
        setError("You do not have permission to access this resource.");
      } else {
        setError("An error occurred while fetching requests.");
      }
    }
  };

  useEffect(() => {
    fetchRequests(currentPage);
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRequestCreated = () => {
    fetchRequests(currentPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Solicitudes</h2>
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
            onClick={() => navigate("/employees")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Empleados
          </button>
          {auth.role === "admin" && (
          <button
            onClick={openModal}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Crear solicitud
          </button>
            )}
        </div>
    
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Codigo</th>
              <th className="py-2 px-4 border-b">Descripcion</th>
              <th className="py-2 px-4 border-b">Asunto</th>
              <th className="py-2 px-4 border-b">Estado</th>
              <th className="py-2 px-4 border-b">Empleado</th>
              <th className="py-2 px-4 border-b">Fecha creacion</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="py-2 px-4 border-b">{request.code}</td>
                <td className="py-2 px-4 border-b">{request.description}</td>
                <td className="py-2 px-4 border-b">{request.summary}</td>
                <td className="py-2 px-4 border-b">{request.status}</td>
                <td className="py-2 px-4 border-b">{request.employee.name}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(request.createdAt).toLocaleString()}
                </td>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Crear Solicitud</h2>
            <RequestForm onClose={closeModal} onRequestCreated={handleRequestCreated} />
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

export default RequestList;
