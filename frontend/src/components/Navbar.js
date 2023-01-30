import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import image from "../images/star.png";
import ConnectWallet from "./ConnectWallet";


const Navbar = (props) => {
    const navigate = useNavigate();

    const [color,setColor] = useState('white')
    const [color1,setColor1] = useState('white')

  return (
    <>
      <div>
        <div style={{ padding: "20px 40px 0px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between"}}>
            <div style={{ cursor: "pointer" }} onClick={() => {navigate("/");setColor('white');setColor1('white')}}>
              <h1>MEMO</h1>
              <h5>01.01.2023</h5>
            </div>
            <div style={{ cursor: "pointer", textAlign: "right" }}>
              <h4>
                <ConnectWallet />
                <br />
                <span
                  style={{ color: color }}
                  onClick={() => {navigate("/explore"); setColor('#658BD6');setColor1('white')}}
                >
                  EXPLORE MEMOS
                </span>
                <br />
                <span
                  style={{ color: color1 }}
                  onClick={() => {navigate("/dashboard/createdmemos");setColor1('#658BD6');setColor('white')}}
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
