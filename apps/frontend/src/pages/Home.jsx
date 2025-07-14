import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to PodSync</h1>
        <p className="text-gray-600 mb-8">
          {user 
            ? `Welcome back! You're now logged in.`
            : 'Please log in to access your profile and other features.'
          }
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/login" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;