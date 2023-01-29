import { useState } from "react";
import { useNavigate } from "react-router";
import image from "../images/star.png";
import Navbar from "../components/Navbar.js";
import BoughtMemos from "./BoughtMemos";
import CreatePost from "./CreatePost";

const CreatedMemos = () => {
  const navigate = useNavigate();

  const [hover, setHover] = useState(false);
  const [creatememo, setCreateMemo] = useState(true);
  const [boughtmemo, setBoughtMemo] = useState(false);
  const [createpost, setCreatePost] = useState(false);
  const [color, setColor] = useState('white');
  const [colorb, setColorb] = useState('#658BD6');
  const [colorc, setColorc] = useState('white');

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const post = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div style={post}>
      <div style={{ padding: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Navbar color="#658BD6" />
        </div>

        <div>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "20%", padding: "15px", cursor: "pointer" }}>
                <h4
                  style={{ color: colorc }}
                  onClick={() => {
                    setCreateMemo(false); setBoughtMemo(false); setColor('white'); setColorb('white'); setCreatePost(true); setColorc('#658BD6')}}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  CREATE
                </h4>
                <h4>STORAGE</h4>
                <h4 
                  onClick={()=>{
                    setCreateMemo(true); setBoughtMemo(false); setColor('white'); setColorb('#658BD6'); setCreatePost(false); setColorc('white')}} 
                    style={{color:colorb}}>CREATED MEMOS</h4>
                <h4 onClick={()=>{setCreateMemo(false); setBoughtMemo(true); setColor('#658BD6'); setColorb('white');setColorc('white')}} 
                style={{color:color}} >BOUGHT MEMOS</h4>
                <h4>ANALYTICS</h4>
                <h4>ACCOUNT</h4>
              </td>
              {creatememo && <div style={{height:'400px',overflowY:'auto'}}>
              <td style={{ width: "80%", padding: "10px" }}>
                <h3>CREATED PROJECTS</h3>
                <table
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 27, 96, 0.7) 0%, rgba(127, 1, 1, 0) 100%)",
                    padding: "0px",
                  }}
                >
                  <tr>
                    <td style={{ paddingLeft: "40px" }}>
                      <h5>MUSIC</h5>
                    </td>
                    <td style={{ paddingLeft: "80px" }}></td>
                    <td><h5>File Size: 50MB</h5></td>
                  </tr>
                  <tr>
                    <td style={{ width: "340px", paddingLeft: "40px" }}>
                      <h5>
                        This record is made up of music from around the globe.
                      </h5>
                      <h5>18. 05. 2020</h5>
                    </td>
                    <td style={{ width: "270px" }}></td>
                    <td style={{ width: "200px" }}>
                      <h5>
                        {" "}
                        Price: $4000
                        <br /> $ DOWNLOAD
                      </h5>
                    </td>
                  </tr>
                </table>
              </td>
              </div>
              }   
              {boughtmemo &&
                <BoughtMemos/>
              }
              {createpost &&
                <CreatePost/>
              }
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CreatedMemos;
