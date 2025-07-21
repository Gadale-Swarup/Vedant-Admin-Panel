// import { Outlet } from "react-router-dom";
// import "./Layout.scss"; // Ensure this file contains the dashboard styles
// import Header from "../Header/Header";
// import Sidebar from "../Sidebar/Sidebar";

// const Layout = () => {
//   return (
//     <div
      // className="dashboard d-flex flex-column"
      // style={{ minHeight: "100vh" }}
//     >
//       <Header />
//       <div
//         className="dashboard-body d-flex flex-grow-1"
//         style={{ minHeight: "0" }}
//       >
//         <Sidebar />
//         <div
          // className="main-content bg-white"
          // style={{ overflowY: "auto" ,backgroundColor:'#f0f0f1' }}
//         >
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;


import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './Layout.scss';

const Layout = ({ isCreator = false }) => {
  return (
    <div className="dashboard d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar isCreator={isCreator} />
      <div className="dashboard-main d-flex flex-column flex-grow-1">
        <Header isCreator={isCreator} />
        <div 
          className="main-content flex-grow-1"
          style={{ 
            overflowY: "auto", 
            backgroundColor: 'white',
            padding: '15px'
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
