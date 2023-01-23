import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
// import {ethers} from 'ethers';

import SignIn  from "./components/SignIn";
import UploadContent from "./pages/UploadContent";
import ProtectedContent from "./pages/Content";
import GetProtected from "./components/GetProtected";

import "./styles/App.css";

function App() {
  return (
    <>

    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path="/uploadcontent" element={<UploadContent/>}/>
      <Route path="/getprotected" element={<GetProtected/>}/>
      <Route path="/protectedContent" element={<ProtectedContent/>}/>
    </Routes>
    
    </>
  
  );
}

export default App;
