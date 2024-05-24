import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AlertContext } from '../../context/AlertContext';

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'employee',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const response = await api.post(endpoint, formData);
      if (!isRegister) {
        login(response.data.user.username, response.data.token, response.data.user.role);
        localStorage.setItem('token', response.data.token);
        showAlert('Bienvenido de nuevo', 'success');
        navigate('/Home');
      } else {
        setIsRegister(false);
      }
    } catch (error) {
      showAlert('Usuario o contrase;a incorrecta', 'error');

      console.error('Authentication failed:', error);
    }
  };

  return (
<>
<div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">{isRegister ? 'Registrarse' : 'Iniciar Sesion'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Contrasña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          {isRegister && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="employee">Empleado</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {isRegister ? 'Registrarse' : 'Iniciar'}
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              {isRegister ? 'Ya tienes una cuenta?' : 'Crea tu cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
</>
  );
};

export default Login;