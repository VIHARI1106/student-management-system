import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

function AddStudent() {
  const [student, setStudent] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !student.studentId ||
      !student.firstName ||
      !student.lastName ||
      !student.email ||
      !student.dob ||
      !student.department ||
      !student.enrollmentYear
    ) {
      setToast({ message: 'All fields are required', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/students', student);
      setToast({ message: 'Student added successfully', type: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to add student', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={student.studentId}
            onChange={handleChange}
            className="form-control w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
            className="form-control w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
            className="form-control w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            className="form-control w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={student.dob}
            onChange={handleChange}
            className="form-control w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={student.department}
            onChange={handleChange}
            className="form-control w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Enrollment Year</label>
          <input
            type="number"
            name="enrollmentYear"
            value={student.enrollmentYear}
            onChange={handleChange}
            className="form-control w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={student.isActive}
            onChange={handleChange}
            className="form-check-input h-5 w-5 text-blue-600 focus:ring-blue-500"
          />
          <label className="font-medium text-gray-700">Is Active</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-2 rounded-lg hover:shadow-lg transition-all"
        >
          {loading ? (
            <span>
              <i className="fas fa-spinner fa-spin me-2"></i>Adding...
            </span>
          ) : (
            'Add Student'
          )}
        </button>
      </form>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default AddStudent;