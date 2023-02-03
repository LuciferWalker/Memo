import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import CreatedMemos from "./pages/CreatedMemos";
import PostDescription from "./pages/PostDescription";
import Download from "./pages/Download";
import Display from "./pages/Display";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import "./styles/App.css";
import BoughtMemos from "./pages/BoughtMemos";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="explore" element={<Explore />}/>
          <Route path="/explore/:projectId" element={<PostDescription />} />
        <Route path="/download" element={<Download />} />
        <Route path="/display" element={<Display />} />

        <Route path="dashboard" element={<Dashboard />}>
          <Route path="createProject" element={<CreatePost />} />
          <Route path="createdMemos" element={<CreatedMemos />} />
          <Route path="boughtMemos" element={<BoughtMemos />} />
        </Route>
      </Routes>
      <NotificationContainer/>

      {/* <Route path="*" element={<>error</>} /> */}
    </>
  );
}

export default App;
