import { useNavigate } from "react-router-dom";
import image from "../images/star.png";
import { useEffect, useState } from "react";
import { formatBytes } from "../utils";

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [listedProjects, setListedProjects] = useState(null);
  const navigate = useNavigate();

  //call listedProjects api from backend

  const getListedProjects = async () => {
    const res = await fetch("http://localhost:3001/listedProjects");
    const projects = await res.json();
    setListedProjects(projects);
    setLoading(false);
  };

  useEffect(() => {
    getListedProjects();
  }, []);

  const tab = {
    background:
      "linear-gradient(180deg, rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)",
    cursor: "pointer",
    flex: "1",
    margin: "10px",
  };

  const explore = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const sampleProjects = [
    {
      ProjectId: "0",
      Theme: "MUSIC",
      Creators: "CREATORS",
      FileSize: "5MB",
      Description: "This record is made up of music from around the globe.",
      Date: "18.05.2023",
      TokenPrice: 4000,
    },
    {
      ProjectId: "1",
      Theme: "MUSIC",
      Creators: "CREATORS",
      FileSize: "5MB",
      Description: "This record is made up of music from around the globe.",
      Date: "18.05.2023",
      TokenPrice: 4000,
    },
    {
      ProjectId: "2",
      Theme: "ARCHIVES",
      Creators: "CREATORS",
      FileSize: "5MB",
      Description: "This record is made up of music from around the globe.",
      Date: "18.05.2023",
      TokenPrice: 4000,
    },
    {
      ProjectId: "3",
      Theme: "ARCHIVES",
      Creators: "CREATORS",
      FileSize: "10MB",
      Description: "This record is made up of music from around the globe.",
      Date: "18.05.2023",
      TokenPrice: 4000,
    },
  ];

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div style={explore}>
          <div style={{ padding: "20px" }}>
            <div
              style={{
                height: "455px",
                margin: "0px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                overflowY: "auto",
              }}
            >
              {listedProjects.length == 0 ? (
                <h3 style={{ color: "white" }}>
                  Be the first one to register a project on MEMO!
                </h3>
              ) : (
                listedProjects?.map((card, index) => (
                  <>
                    <table
                      key={index}
                      style={tab}
                      onClick={() => navigate(`/explore/${card.projectId}`)}
                    >
                      <tr>
                        <td style={{ paddingLeft: "30px" }}>
                          <h4>{card.projectName}</h4>
                        </td>
                        <td style={{ paddingLeft: "50px" }}>
                          <h5></h5>
                        </td>
                        <td>
                          <h5>File Size: {formatBytes(card.fileSize)} </h5>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "200px", paddingLeft: "30px" }}>
                          <h5>{card.projectDescription}</h5>
                          <h6>{card.Date || ""}</h6>
                        </td>
                        <td style={{ width: "100px" }}></td>
                        <td style={{ width: "130px" }}>
                          <h5>
                            {" "}
                            PRICE: {card.tokenPrice} FIL
                            <br /> $ DOWNLOAD
                          </h5>
                        </td>
                      </tr>
                    </table>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
