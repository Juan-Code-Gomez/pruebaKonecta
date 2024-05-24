import React, { useState } from "react";
import api from "../../services/api";

const RequestForm = ({ onClose, onRequestCreated }) => {
  const [request, setRequest] = useState({
    code: "",
    description: "",
    summary: "",
    status: "",
    employee_id: "",
  });

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/requests", request);
      onRequestCreated();
      onClose();
    } catch (error) {
      console.error("Failed to create request:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="code">
          Code
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={request.code}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={request.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="summary">
          Summary
        </label>
        <input
          type="text"
          id="summary"
          name="summary"
          value={request.summary}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="status">
          Status
        </label>
        <input
          type="text"
          id="status"
          name="status"
          value={request.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="employee_id">
          Employee ID
        </label>
        <input
          type="number"
          id="employee_id"
          name="employee_id"
          value={request.employee_id}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Create Request
      </button>
    </form>
  );
};

export default RequestForm;
