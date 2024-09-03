import React from "react";
import { Route, Routes } from "react-router";

import AddItem from "./Components/Items/Admin/Add-Items/AddItem";
import ItemDetails from "./Components/Items/Admin/Item/ItemDetails";
import InventoryLogin from "./Components/Items/Login/Login";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*Inventory Managemnet System*/}
         
          <Route path="/inventory/login" element={<InventoryLogin />} />
          <Route path="/inventory/additem" element={<AddItem />} />
          <Route path="/inventory/itemdash" element={<ItemDetails />} />
          
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
