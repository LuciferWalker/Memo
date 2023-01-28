import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import image from "../images/star.png";
import Img1 from "../images/mars.jpg";
import Navbar from "../components/Navbar.js";

const PostDescription = () => {

  const [projectDetail, setprojectDetail] = useState(null)
  let { projectId } = useParams();

  const fetchProjectDetails = async () =>{
    const res = await fetch("http://localhost:3001/getProjectData/"+projectId);
    const project = await res.json();
    setprojectDetail(project[0])
  }

  useEffect(()=>{
    fetchProjectDetails();
  },[])
  const [hover, sethover] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {sethover(true);};
  const handleMouseLeave = () => {sethover(false);};

  const post={
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const tab = {
    background:
      "linear-gradient(180deg, rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)",
    padding: "0px",
    cursor:'pointer'
  };

  const purchaseToken = ()=>{
    //call mint function from marketplace contract

    //getProjectStatus();
    //if false, send a req to backend

    //projectTokenBought api call

    //after successful purchase, redirect them to download page
  }

  console.log(projectDetail);
  return (
    <div style={post}>
      <div style={{ padding: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Navbar />
        </div>
        <div>
          <table>
            <tr>
              <td
                style={{
                  width: "700px",
                  backgroundColor: "rgba(7, 7, 7, 0.5)",
                }}
              >
                <div style={{ paddingLeft: "30px" }}>
                  <h4>PROJECT TITLE</h4>
                  <img src={projectDetail?.img || Img1} style={{ height: "55%" }} />
                  <h4>PROJECT DESCRIPTION</h4>
                  {projectDetail && projectDetail.description || ''}
                  <h4>CREATORS</h4>
                  {projectDetail?
                  projectDetail.creatorAddresses.map(item=><h5 style={{ margin: "10px" }}>{item}</h5 >)
                  :""}
                </div>
              </td>
              <td style={{ paddingLeft: "20px" }}>
                <table style={tab}>
                  <tr>
                    <td style={{ paddingLeft: "20px" }}>
                      <h4>DOWNLOAD</h4>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "200px", paddingLeft: "20px" }}>
                      <h5>18.05.2023</h5>
                    </td>
                    <td style={{ width: "200px" }}></td>
                    <td style={{ width: "200px" }}>
                      <h5>
                        WISHLIST
                        <span
                          style={{ marginLeft: "30px", paddingRight: "10px",
                          color: hover ? '#658BD6' : 'white',}}
                          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                          onClick={()=>navigate("/download")}
                        >
                          PURCHASE
                        </span>
                      </h5>
                    </td>
                  </tr>
                </table>
                <table style={tab}>
                  <tr>
                    <td style={{ paddingLeft: "20px" }}>
                      <h4>RENT</h4>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "200px", paddingLeft: "20px" }}>
                      <h5>18.05.2023</h5>
                    </td>
                    <td style={{ width: "200px" }}></td>
                    <td style={{ width: "200px" }}>
                      <h5>
                        WISHLIST
                        <span
                          style={{ marginLeft: "30px", paddingRight: "10px" }}
                        >
                          PURCHASE
                        </span>
                      </h5>
                    </td>
                  </tr>
                </table>
                <table style={tab}>
                  <tr>
                    <td style={{ paddingLeft: "20px" }}>
                      <h4>PURCHASE</h4>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "200px", paddingLeft: "20px" }}>
                      <h5>18.05.2023</h5>
                    </td>
                    <td style={{ width: "200px" }}></td>
                    <td style={{ width: "200px" }}>
                      <h5>
                        WISHLIST
                        <span
                          style={{ marginLeft: "30px", paddingRight: "10px" }}
                        >
                          PURCHASE
                        </span>
                      </h5>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostDescription;
