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

//Training Management
import AddCourse from "./Components/Training Management/AddCourse/AddCourse";
import AllCourses from "./Components/Training Management/Course/CourseDetails";
import TraineeLogin from "./Components/Training Management/Login/Login";
import EmpAllCourses from "./Components/Training Management/AllCourses/AllCourseDetails";

//Client Management
import AddInquiry from "./Components/Client Management/AddInquiry/AddInquery";
import AllInquires from "./Components/Client Management/AllInquires/AllInquires";
import ClientManagerLogin from "./Components/Client Management/Login/Login";
import ValidateInquiry from "./Components/Client Management/ClientInquiry/Validate";

//Booking Management
import AddBooking from "./Components/Booking Management/AddBooking/AddBooking";
import AllBookings from "./Components/Booking Management/AllBookings/AllBookings";
import BookingManagerLogin from "./Components/Booking Management/Login/Login";
import ValidateBookings from "./Components/Booking Management/ClientBooking/ValidateBookings";

//Payment Management
import AddPayment from "./Components/Payment Management/Add Payment/AddPayment";
import Payments from "./Components/Payment Management/AllPayments/Payments";
import PaymentManagerLogin from "./Components/Payment Management//Login/Login"

//Payment Management
import AllBookingss from "./Components/Operation Management/AllBookings/Booking"
import AddOperations from "./Components/Operation Management/AddOperation/AddOperation"
import Operations from "./Components/Operation Management/View Operation/Operation"
import OperationManagerLogin from "./Components/Operation Management/Login/Login"


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>

           {/*Home Page*/}
           <Route path="/" element={<HomePage />} />


          {/*Inventory Managemnet System*/}
          <Route path="/inlogin" element={<InventoryLogin />} />
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

          {/*Training Managemnet System*/}
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/coursedash" element={<AllCourses />} />
          <Route path="/trainng/login" element={<TraineeLogin />} />
          <Route path="/empallcourses" element={<EmpAllCourses />} />

          {/*Client Managemnet System*/}
          <Route path="/addinquiry" element={<AddInquiry />} />
          <Route path="/inquiresdash" element={<AllInquires />} />
          <Route path="/clientlogin" element={<ClientManagerLogin />} />
          <Route path="/validteInquiries" element={<ValidateInquiry />} />

           {/*Booking Managemnet System*/}
           <Route path="/addbooking" element={<AddBooking />} />
          <Route path="/bookingdash" element={<AllBookings />} />
          <Route path="/bookingmanagerlogin" element={<BookingManagerLogin />} />
          <Route path="/validteBookings" element={<ValidateBookings />} />

           {/*Payment Managemnet System*/}
           <Route path="/addpayment/:bookingId" element={<AddPayment />} />
           <Route path="/payments" element={<Payments />} />
           <Route path="/paymentMnlogin" element={<PaymentManagerLogin />} />

           {/*Operation Managemnet System*/}
           <Route path="/allbookings" element={<AllBookingss />} />
           <Route path="/add-operation" element={<AddOperations />} />
           <Route path="/operations" element={<Operations />} />
           <Route path="/operatonlogin" element={<OperationManagerLogin />} />



        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
