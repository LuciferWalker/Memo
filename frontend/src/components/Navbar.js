import { useState } from "react";
import { useNavigate } from "react-router";
import ConnectWallet from "./ConnectWallet";

const Navbar = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {/* <div style={{display:'flex',justifyContent: 'space-between'}}> */}
      <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <h1>MEMO</h1>
        <h5>01.01.2023</h5>
      </div>
      <div style={{ cursor: "pointer", textAlign:'right' }}>
        <h4>
          <ConnectWallet />
          <br />
          <span
            style={{ color: props.color1 }}
            onClick={() => navigate("/explore")}
          >
            EXPLORE MEMOS
          </span>
          <br />
          <span
            style={{ color: props.color }}
            onClick={() => navigate("/post")}
          >
            DASHBOARD
          </span>
        </h4>
      </div>
      {/* </div> */}
    </>
  );
};

export default Navbar;
