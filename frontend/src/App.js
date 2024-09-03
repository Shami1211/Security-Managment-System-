import React from "react";
import { Route, Routes } from "react-router";

 //Inventory
import AddItem from "./Components/Items/Admin/Add-Items/AddItem";
import ItemDetails from "./Components/Items/Admin/Item/ItemDetails";
import InventoryLogin from "./Components/Items/Login/Login";

//User Management
import AddUser from "./Components/User Managment/AddUser/AddUser";
import UserDetails from "./Components/User Managment/UserDetails/Useretails";
import UpdateEmploye from "./Components/User Managment/UpdateUser/UpdateUser";
import Profile from "./Components/User Managment/Profile/Profile";


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          
          {/*Inventory Managemnet System*/}
          <Route path="/inventory/login" element={<InventoryLogin />} />
          <Route path="/inventory/additem" element={<AddItem />} />
          <Route path="/inventory/itemdash" element={<ItemDetails />} />
          
          {/*User Managemnet System*/}
          <Route path="/user/adduser" element={<AddUser />} />
          <Route path="/user/useredetails" element={<UserDetails />} />
          <Route path="/user/updateemploye/:id" element={<UpdateEmploye />} />
          <Route path="/profile/:id" element={<Profile />} />


        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
