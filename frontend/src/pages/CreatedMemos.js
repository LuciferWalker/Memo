import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../images/star.png";
import Navbar from "../components/Navbar.js";
import BoughtMemos from "./BoughtMemos";
import CreatePosttry from "./CreatePosttry";
import Dashboard from "../components/Dashboard";

const CreatedMemos = () => {
  const navigate = useNavigate();

  const [hover, setHover] = useState(false);
  const [creatememo, setCreateMemo] = useState(true);
  const [boughtmemo, setBoughtMemo] = useState(false);
  const [createpost, setCreatePost] = useState(false);

  const [createdProjects, setCreatedProjects] = useState(null);
  const [boughtProjects, setBoughtProjects] = useState(null);

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

  const getCreatedProjects = async () => {
    const response = await fetch(
      `http://localhost:3001/createdProjects?address=${localStorage.getItem(
        "account"
      )}`
    );
    const projects = await response.json();
    setCreatedProjects(projects);
  };

  const getBoughtProjects = async () => {
    const response = await fetch(
      `http://localhost:3001/boughtProjects?address=${localStorage.getItem(
        "account"
      )}`
    );
    const projects = await response.json();
    setBoughtProjects(projects);
  };

  useEffect(() => {
    getCreatedProjects();
    getBoughtProjects();
    if(localStorage.getItem('account') == 'Connect Wallet'){navigate("/")}
  }, []);

  console.log(boughtProjects, createdProjects);

  return (
    <>
        {creatememo && (
          <div style={{ display:'flex',flexDirection:'column',height: "440px", overflowY: "auto" }}>
              <h3>CREATED PROJECTS</h3>
              {createdProjects == null ? <h2 style={{color:'black'}}>Create a Project</h2>:createdProjects?.map((card, index) => (
                <>
                <table
                  key={index}
                  onClick={() => navigate(`/${card.projectId}`)}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 27, 96, 0.7) 0%, rgba(127, 1, 1, 0) 100%)",
                    padding: "0px",
                  }}
                >
                  <tr>
                    <td style={{ paddingLeft: "40px" }}>
                      <h5>{card.projectName}</h5>
                    </td>
                    <td style={{ paddingLeft: "80px" }}></td>
                    <td>
                      <h5>File Size: {card.fileSize}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "340px", paddingLeft: "40px" }}>
                      <h5>{card.projectDescription}</h5>
                      <h5>{card.Date || ""}</h5>
                    </td>
                    <td style={{ width: "270px" }}></td>
                    <td style={{ width: "200px" }}>
                      <h5>
                        {" "}
                        PRICE: {card.tokenPrice} FIL
                        <br /> $ DOWNLOAD
                      </h5>
                    </td>
                  </tr>
                </table>
                <br/></>
              ))}
          </div>
        )}
        </>
  );
};
export default CreatedMemos;
