import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Toast from './Toast';
import * as XLSX from 'xlsx'; // Import xlsx library

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/students')
      .then((res) => setStudents(res.data))
      .catch((err) => {
        console.error('Error fetching students:', err);
        setToast({ message: 'Failed to load students', type: 'error' });
      });
  }, []);

  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(search.toLowerCase()) ||
    student.lastName.toLowerCase().includes(search.toLowerCase()) ||
    student.studentId.toLowerCase().includes(search.toLowerCase())
  );

  // Function to download the student list as an Excel file
  const handleDownloadExcel = () => {
    // Prepare the data for Excel
    const excelData = filteredStudents.map((student) => ({
      'Student ID': student.studentId,
      'First Name': student.firstName,
      'Last Name': student.lastName,
      Email: student.email,
      'Date of Birth': new Date(student.dob).toLocaleDateString(),
      Department: student.department,
      'Enrollment Year': student.enrollmentYear,
      Active: student.isActive ? 'Yes' : 'No',
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    // Auto-adjust column widths for better readability
    const maxWidths = excelData.reduce((acc, row) => {
      Object.keys(row).forEach((key, index) => {
        const value = row[key] ? row[key].toString() : '';
        acc[index] = Math.max(acc[index] || 10, Math.min(value.length, 50));
      });
      return acc;
    }, {});
    worksheet['!cols'] = Object.keys(maxWidths).map((index) => ({
      wch: maxWidths[index],
    }));

    // Generate and download the Excel file
    XLSX.writeFile(workbook, 'StudentList.xlsx');
  };

  return (
    <div className="container my-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
        <i className="fas fa-list mr-3 text-blue-600"></i> Student List
      </h2>
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Search by name or ID..."
          className="form-control w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleDownloadExcel}
          className="btn btn-primary px-6 py-3 rounded-full text-white bg-blue-700 hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <i className="fas fa-download mr-2"></i> Download as Excel
        </button>
      </div>
      {filteredStudents.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-bordered table-striped table-hover w-full bg-white rounded-lg shadow-md">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-gray-700 font-semibold">Student ID</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">First Name</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Last Name</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Email</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Date of Birth</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Department</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Enrollment Year</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Active</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="px-4 py-3">{student.studentId}</td>
                  <td className="px-4 py-3">{student.firstName}</td>
                  <td className="px-4 py-3">{student.lastName}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{new Date(student.dob).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{student.department}</td>
                  <td className="px-4 py-3">{student.enrollmentYear}</td>
                  <td className="px-4 py-3">{student.isActive ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/edit/${student._id}`}
                      className="btn btn-primary btn-sm px-3 py-1 rounded-full hover:bg-blue-600 transition-all duration-200"
                    >
                      <i className="fas fa-edit mr-1"></i> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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

export default StudentList;