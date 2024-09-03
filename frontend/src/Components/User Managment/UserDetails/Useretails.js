import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/employee";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function EmployeDetails() {
  const [emp, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(""); // State for selected type
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const ComponentsRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => setEmployee(data.emp));
  }, []);

  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Employee Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`);
        window.alert("Account deleted successfully!");

        // Fetch the updated list of employees after deletion
        const updatedEmployees = await fetchHandler();
        setEmployee(updatedEmployees.emp);
      } catch (error) {
        console.error("Error deleting details:", error);
      }
    }
  };

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Details Report",
    onafterprint: () => alert("Details Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.emp.filter((emp) =>
        Object.values(emp).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setEmployee(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  // Filtered employees based on the selected type
  const filteredEmployees = emp.filter(
    (employee) => !selectedType || employee.type === selectedType
  );

  // Categorize employees by type
  const categorizedEmployees = {
    Client: filteredEmployees.filter((emp) => emp.type === "Client"),
    Employee: filteredEmployees.filter((emp) => emp.type === "Employee"),
  };

  return (
    <div>
      <div className="children_div_admin">
        <div className="dash_button_set">
          <tr>
            <td>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="form_box_item_input"
              >
                <option value="">All Types</option>
                <option value="Client">Client</option>
                <option value="Employee">Employee</option>
              </select>
            </td>
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Here..."
              ></input>
            </td>

            <td>
              <button onClick={handleSearch} className="btn_dash_admin">
                Search
              </button>
            </td>
          </tr>
          <button className="btn_dash_admin" onClick={handlePrint}>
            Generate Report
          </button>
        </div>

        <div className="tbl_con_admin" ref={ComponentsRef}>
          <h1 className="topic_inventory">
            Account
            <span className="sub_topic_inventory"> Details</span>{" "}
          </h1>

          {/* Display Clients */}
          <div>
            <h2>Clients</h2>
            <table className="table_details_admin">
              <thead>
                <tr className="admin_tbl_tr">
                  <th className="admin_tbl_th">Name</th>
                  <th className="admin_tbl_th">Phone</th>
                  <th className="admin_tbl_th">Address</th>
                  <th className="admin_tbl_th">Gmail</th>
                  <th className="admin_tbl_th">Action</th>
                </tr>
              </thead>
              {categorizedEmployees.Client.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="5">No Clients Found</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {categorizedEmployees.Client.map((item, index) => (
                    <tr className="admin_tbl_tr" key={index}>
                      <td className="admin_tbl_td">{item.name}</td>
                      <td className="admin_tbl_td">{item.phone}</td>
                      <td className="admin_tbl_td">{item.address}</td>
                      <td className="admin_tbl_td">{item.gmail}</td>
                      <td className="admin_tbl_td">
                        <Link
                          to={`/user/updateemploye/${item._id}`}
                          className="btn_dash_admin"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => deleteHandler(item._id)}
                          className="btn_dash_admin_dlt"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>

          {/* Display Employees */}
          <div>
            <h2>Employees</h2>
            <table className="table_details_admin">
              <thead>
                <tr className="admin_tbl_tr">
                  <th className="admin_tbl_th">Name</th>
                  <th className="admin_tbl_th">Phone</th>
                  <th className="admin_tbl_th">Address</th>
                  <th className="admin_tbl_th">Gmail</th>
                  <th className="admin_tbl_th">Action</th>
                </tr>
              </thead>
              {categorizedEmployees.Employee.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="5">No Employees Found</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {categorizedEmployees.Employee.map((item, index) => (
                    <tr className="admin_tbl_tr" key={index}>
                      <td className="admin_tbl_td">{item.name}</td>
                      <td className="admin_tbl_td">{item.phone}</td>
                      <td className="admin_tbl_td">{item.address}</td>
                      <td className="admin_tbl_td">{item.gmail}</td>
                      <td className="admin_tbl_td">
                        <Link
                          to={`/user/updateemploye/${item._id}`}
                          className="btn_dash_admin"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => deleteHandler(item._id)}
                          className="btn_dash_admin_dlt"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeDetails;
