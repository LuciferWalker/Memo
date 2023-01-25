import { useNavigate } from "react-router";
import image from "../images/star.png";
import Navbar from "../components/Navbar.js";
import { useEffect, useState } from "react";

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [listedProjects, setListedProjects] = useState(null);
  const navigate = useNavigate();

  //call listedProjects api from backeend

  const getListedProjects = async () => {
    const res = await fetch("http://localhost:3001/listedProjects");
    const projects = await res.json();
    setListedProjects(listedProjects);
    setLoading(false);
  };

  useEffect(() => {
    getListedProjects();
  }, []);

  const tab = {
    background:
      "linear-gradient(180deg, rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)",
    padding: "1px",
    cursor: "pointer",
  };

  const explore = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const sampleProjects = [
    {
      Theme: "MUSIC",
      Creators: "CREATORS",
      Description: "This record is made up of music from around the globe.",
      Date: "18.05.2023",
    },
    {
      Theme: "MUSIC",
      Creators: "CREATORS",
      Description: "This record is made up of music from around the globe.",
      Date: "18.05.2023",
    },
    {
      Theme: "MUSIC",
      Creators: "CREATORS",
      Description: "This record is made up of music from around the globe.",
      Date: "18.05.2023",
    },
  ];

  return (
    <div style={explore}>
      <div style={{ padding: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Navbar color1="#658BD6" />
        </div>
{/* 
      map the sampleProjects array and render the cards accordingly */}


        <table>
          <tr>
            <td>
              <table style={tab} onClick={() => navigate("/desc")}>
                <tr>
                  <td style={{ paddingLeft: "40px" }}>
                    <h5>{sampleProjects.Theme}</h5>
                  </td>
                  <td style={{ paddingLeft: "80px" }}>
                    <h5>{sampleProjects.Creators}</h5>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "340px", paddingLeft: "40px" }}>
                    <h5>{sampleProjects.Description}</h5>
                    <h6>18.05.2023</h6>
                  </td>
                  <td style={{ width: "250px" }}></td>
                  <td style={{ width: "200px" }}>
                    <h5>
                      {" "}
                      $ LISTEN
                      <br /> $ DOWNLOAD
                    </h5>
                  </td>
                </tr>
              </table>
            </td>
            <td style={{ paddingLeft: "20px" }}>
              <table style={tab} onClick={() => navigate("/desc")}>
                <tr>
                  <td style={{ paddingLeft: "40px" }}>
                    <h5>MUSIC</h5>
                  </td>
                  <td style={{ paddingLeft: "80px" }}>
                    <h5>CREATORS</h5>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "340px", paddingLeft: "40px" }}>
                    <h5>
                      This record is made up of music from around the globe.
                    </h5>
                    <h6>18.05.2023</h6>
                  </td>
                  <td style={{ width: "250px" }}></td>
                  <td style={{ width: "200px" }}>
                    <h5>
                      {" "}
                      $ LISTEN
                      <br /> $ DOWNLOAD
                    </h5>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table style={{ marginTop: "8px" }}>
          <tr>
            <td>
              <table style={tab} onClick={() => navigate("/desc")}>
                <tr>
                  <td style={{ paddingLeft: "40px" }}>
                    <h5>ARCHIVES</h5>
                  </td>
                  <td style={{ paddingLeft: "80px" }}>
                    <h5>CREATORS</h5>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "340px", paddingLeft: "40px" }}>
                    <h5>PROJECT DESCRIPTION</h5>
                    <h6>18.05.2023</h6>
                  </td>
                  <td style={{ width: "250px" }}></td>
                  <td style={{ width: "200px" }}>
                    <h5 style={{ marginRight: "20px" }}>
                      {" "}
                      $ JOIN COMMUNITY
                      <br /> $ DOWNLOAD
                    </h5>
                  </td>
                </tr>
              </table>
            </td>
            <td style={{ paddingLeft: "20px" }}>
              <table style={tab} onClick={() => navigate("/desc")}>
                <tr>
                  <td style={{ paddingLeft: "40px" }}>
                    <h5>ARCHIVES</h5>
                  </td>
                  <td style={{ paddingLeft: "80px" }}>
                    <h5>CREATORS</h5>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "340px", paddingLeft: "40px" }}>
                    <h5>PROJECT DESCRIPTION</h5>
                    <h6>18.05.2023</h6>
                  </td>
                  <td style={{ width: "250px" }}></td>
                  <td style={{ width: "200px" }}>
                    <h5 style={{ marginRight: "20px" }}>
                      {" "}
                      $ JOIN COMMUNITY
                      <br /> $ DOWNLOAD
                    </h5>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Explore;
