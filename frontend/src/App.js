import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Explore from "./pages/Explore";
// import {ethers} from 'ethers';

// import SignIn  from "./components/SignIn";
// import UploadContent from "./pages/UploadContent";
// import ProtectedContent from "./pages/Content";
// import GetProtected from "./components/GetProtected";
import Home from "./pages/Home";
import Post from "./pages/Post";
import PostDescription from "./pages/PostDescription";

import "./styles/App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/post" element={<Post />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/desc" element={<PostDescription/>} />
        {/* <Route path="/uploadcontent" element={<UploadContent/>}/>
      <Route path="/getprotected" element={<GetProtected/>}/>
      <Route path="/protectedContent" element={<ProtectedContent/>}/> */}
      </Routes>
    </>
  );
}

export default App;
