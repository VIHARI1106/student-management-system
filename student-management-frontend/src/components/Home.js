import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex items-center justify-center py-16">
      <div className="max-w-4xl w-full px-6 text-center bg-white bg-opacity-90 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-3xl border border-gray-200">
        <div className="p-8">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6 flex items-center justify-center animate-fade-in">
            <i className="fas fa-graduation-cap text-5xl text-blue-700 mr-4"></i>
            Student Management System
          </h1>
          <p className="text-2xl text-gray-700 mb-10 leading-relaxed animate-slide-up">
            Empower your institution with a seamless platform to manage student records, streamline updates, and enhance organization with cutting-edge efficiency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/students"
              className="btn btn-outline-primary btn-lg px-8 py-4 rounded-full text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <i className="fas fa-list mr-3"></i> View Student List
            </Link>
            <Link
              to="/add"
              className="btn btn-outline-success btn-lg px-8 py-4 rounded-full text-green-700 border-2 border-green-700 hover:bg-green-700 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <i className="fas fa-plus mr-3"></i> Add New Student
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animation keyframes
const styles = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-fade-in { animation: fade-in 1s ease-out; }
  .animate-slide-up { animation: slide-up 1s ease-out 0.5s backwards; }
`;

// Inject styles if in a browser environment
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Home;