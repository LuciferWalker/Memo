import React from "react";
import {useNavigate} from 'react-router-dom'
import image from "../images/star.png";
import ConnectWallet from "./ConnectWallet";


const Navbar = () => {
  const post = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
    const navigate = useNavigate();

  return (
    <>
      <div style={post}>
        <div style={{ padding: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              <h1>MEMO</h1>
              <h5>01.01.2023</h5>
            </div>
            <div style={{ cursor: "pointer", textAlign: "right" }}>
              <h4>
                <ConnectWallet />
                <br />
                <span
                  style={{ color: "#658BD6" }}
                  onClick={() => navigate("/explore")}
                >
                  EXPLORE MEMOS
                </span>
                <br />
                <span
                  style={{ color: "#658BD6" }}
                  onClick={() => navigate("/dashboard/createdmemos")}
                >
                  DASHBOARD
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
