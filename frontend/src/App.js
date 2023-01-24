import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import CreatePost from "./components/CreatePost";
import Explore from "./components/Explore";
// import {ethers} from 'ethers';

// import SignIn  from "./components/SignIn";
// import UploadContent from "./pages/UploadContent";
// import ProtectedContent from "./pages/Content";
// import GetProtected from "./components/GetProtected";
import Home from './components/Home'
import Post from "./components/Post";
import PostDescrip from "./components/PostDescrip";

import "./styles/App.css";

function App() {
  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/post" element={<Post/>}/>
      <Route path="/createpost" element={<CreatePost/>}/>
      <Route path="/desc" element={<PostDescrip/>}/>
      {/* <Route path="/uploadcontent" element={<UploadContent/>}/>
      <Route path="/getprotected" element={<GetProtected/>}/>
      <Route path="/protectedContent" element={<ProtectedContent/>}/> */}
    </Routes>
    
    </>
  
  );
}

export default App;
