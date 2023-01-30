import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import CreatedMemos from "./pages/CreatedMemos";
import PostDescription from "./pages/PostDescription";
import Download from "./pages/Download";
import Display from "./pages/Display";
// import {ethers} from 'ethers';
// import SignIn  from "./components/SignIn";
// import UploadContent from "./pages/UploadContent";
// import ProtectedContent from "./pages/Content";
// import GetProtected from "./components/GetProtected";
// import 'react-notifications/lib/notifications.css';
// import { NotificationContainer } from 'react-notifications';

import "./styles/App.css";
import BoughtMemos from "./pages/BoughtMemos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/projects" element={<CreatedMemos />} />
        <Route path="/boughtmemos" element={<BoughtMemos />} />
        <Route path="/:projectId" element={<PostDescription/>} />
        <Route path="/download" element={<Download/>} />
        <Route path="/display" element={<Display/>} />
        {/* <Route path="/uploadcontent" element={<UploadContent/>}/>
      <Route path="/getprotected" element={<GetProtected/>}/>
      <Route path="/protectedContent" element={<ProtectedContent/>}/> */}
      </Routes>
      {/* <NotificationContainer/> */}
    </>
  );
}

export default App;
