import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OperationsList = () => {
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOperationId, setEditOperationId] = useState(null);
  const [updatedOfficers, setUpdatedOfficers] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/operations');
        setOperations(response.data.operations);
      } catch (err) {
        setError('Error fetching operations');
      } finally {
        setLoading(false);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employee');
        const employees = response.data.emp.filter(employee => employee.type === 'Employee');
        setEmployeeOptions(employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchOperations();
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/operations/${id}`);
      setOperations(operations.filter((operation) => operation._id !== id));
    } catch (err) {
      setError('Error deleting operation');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/operations/${editOperationId}`, { officers: updatedOfficers });
      const updatedOperations = operations.map((operation) =>
        operation._id === editOperationId ? { ...operation, officers: updatedOfficers } : operation
      );
      setOperations(updatedOperations);
      setIsEditing(false);
      setEditOperationId(null);
      setUpdatedOfficers([]);
    } catch (err) {
      setError('Error updating operation');
    }
  };

  const handleEditClick = (operationId, currentOfficers) => {
    setEditOperationId(operationId);
    setUpdatedOfficers(currentOfficers);
    setIsEditing(true);
  };

  const handleAddOfficer = () => {
    if (selectedOfficer && !updatedOfficers.includes(selectedOfficer)) {
      setUpdatedOfficers([...updatedOfficers, selectedOfficer]);
      setSelectedOfficer('');
    }
  };

  const handleRemoveOfficer = (officerToRemove) => {
    setUpdatedOfficers(updatedOfficers.filter(officer => officer !== officerToRemove));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Operations List</h1>
      <ul>
        {operations.map((operation) => (
          <li key={operation._id}>
            <p><strong>Package:</strong> {operation.package}</p>
            <p><strong>Status:</strong> {operation.status}</p>
            <p><strong>Date:</strong> {new Date(operation.date).toLocaleDateString()}</p>
            <p><strong>Officers:</strong> {operation.officers.join(', ')}</p>
            <button onClick={() => handleDelete(operation._id)}>Delete</button>
            <button onClick={() => handleEditClick(operation._id, operation.officers)}>Edit</button>
          </li>
        ))}
      </ul>

      {isEditing && (
        <div>
          <h2>Update Operation</h2>
          <label>
            Officers:
            <div>
              <select
                value={selectedOfficer}
                onChange={(e) => setSelectedOfficer(e.target.value)}
              >
                <option value="">Select an officer</option>
                {employeeOptions.map((employee) => (
                  <option key={employee._id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select>
              <button type="button" onClick={handleAddOfficer}>
                Add Officer
              </button>
            </div>
            <ul>
              {updatedOfficers.map((officer, index) => (
                <li key={index}>
                  {officer} <button onClick={() => handleRemoveOfficer(officer)}>Remove</button>
                </li>
              ))}
            </ul>
          </label>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default OperationsList;
