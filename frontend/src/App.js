import React from "react";
import { Route, Routes } from "react-router";

//Home Page
import HomePage from "./Components/Home/HomePage";

 //Inventory
import AddItem from "./Components/Inventory Management/Items/Admin/Add-Items/AddItem";
import ItemDetails from "./Components/Inventory Management/Items/Admin/Item/ItemDetails";
import InventoryLogin from "./Components/Inventory Management/Items/Login/Login";

//User Management
import AddUser from "./Components/User Managment/AddUser/AddUser";
import UserDetails from "./Components/User Managment/UserDetails/Useretails";
import UpdateEmploye from "./Components/User Managment/UpdateUser/UpdateUser";
import Profile from "./Components/User Managment/Profile/Profile";
import AdminLogin from "./Components/User Managment/Login/Login";
import UserLogin from "./Components/User Managment/UserLogin/UserLogin";

import EmployeeDashboard from "./Components/User Managment/DashBoards/Employee/EmployeeDashboard";
import ClientDashboard from "./Components/User Managment/DashBoards/Client/ClientDashBoard";



function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>

           {/*Home Page*/}
           <Route path="/" element={<HomePage />} />


          {/*Inventory Managemnet System*/}
          <Route path="/inventory/login" element={<InventoryLogin />} />
          <Route path="/inventory/additem" element={<AddItem />} />
          <Route path="/inventory/itemdash" element={<ItemDetails />} />
          
          {/*User Managemnet System*/}
          <Route path="/user/adduser" element={<AddUser />} />
          <Route path="/useredetails" element={<UserDetails />} />
          <Route path="/user/updateemploye/:id" element={<UpdateEmploye />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/user/login" element={<AdminLogin />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/employeedash" element={<EmployeeDashboard />} />
          <Route path="/cleientdash" element={<ClientDashboard />} />




        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
