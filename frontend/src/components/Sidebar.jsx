import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post('http://127.0.0.1:8000/api/logout/')
      .then(() => {
        onLogout();
        navigate('/login');
      })
      .catch((err) => console.error('Logout error:', err));
  };

  return (
    <div className="w-64 bg-white shadow-md flex flex-col justify-between">
      <div>
        <div className="px-6 py-4 flex items-center">
          <h1 className="text-2xl font-bold text-purple-600">ToDoi</h1>
        </div>
        <nav className="mt-8">
          <ul>
            <li className="px-6 py-2 bg-gray-100 border-l-4 border-purple-600">
              <span className="text-gray-900 font-medium">Meetings</span>
            </li>
            {/* We only show “Meetings”. Other items are not required. */}
          </ul>
        </nav>
      </div>
      <div className="px-6 py-4">
        <button
          className="w-full text-left text-gray-700 hover:text-gray-900"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
