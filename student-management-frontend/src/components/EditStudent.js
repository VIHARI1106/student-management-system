import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from './Toast';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/students/${id}`)
      .then((res) => {
        const { dob, ...rest } = res.data;
        setStudent({
          ...rest,
          dob: dob ? new Date(dob).toISOString().split('T')[0] : '',
        });
      })
      .catch((err) => {
        console.error(err);
        setToast({ message: 'Failed to fetch student data', type: 'error' });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/students/${id}`, student)
      .then(() => {
        setToast({ message: 'Student updated successfully', type: 'success' });
        setTimeout(() => navigate('/'), 1000);
      })
      .catch((err) => {
        console.error(err);
        setToast({ message: 'Failed to update student', type: 'error' });
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios
        .delete(`http://localhost:5000/students/${id}`)
        .then(() => {
          setToast({ message: 'Student deleted successfully', type: 'success' });
          setTimeout(() => navigate('/'), 1000);
        })
        .catch((err) => {
          console.error(err);
          setToast({ message: 'Failed to delete student', type: 'error' });
        });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Student</h2>
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="btn btn-success w-full py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Update Student
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-danger w-full py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Delete
          </button>
        </div>
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

export default EditStudent;