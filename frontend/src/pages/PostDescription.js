import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import image from "../images/star.png";
import Img1 from "../images/mars.jpg";
import Navbar from "../components/Navbar.js";
import { useLocation } from "react-router";

const PostDescription = () => {
  const location = useLocation();

  const [projectDetail, setprojectDetail] = useState(null)
  const [isCreator, setIsCreator] = useState(false)
  let { projectId } = useParams();

  const fetchProjectDetails = async () =>{
    const res = await fetch("http://localhost:3001/getProjectData/"+projectId);
    const project = await res.json();
    setprojectDetail(project)
  }
  
  useEffect(()=>{
    fetchProjectDetails();
  },[])
  
  useEffect(()=>{
    if(projectDetail){
      for(let i=0;i<projectDetail.creators.length;i++){
        if(projectDetail.creators[i].address.toLowerCase()===window.localStorage.getItem('account').toLocaleLowerCase()){
          setIsCreator(true)
          break;
        }
      }
    }
  },[projectDetail])
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

  return (
    <div style={post}>
      <div style={{ padding: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Navbar />
        </div>
        <div style={{display:'flex',justifyContent: 'space-between', gap:'20px'}}>
          <table>
            <tr>
            <td
                style={{
                  width: "750px",
                  backgroundColor: "rgba(7, 7, 7, 0.5)",
                }}
              >
                <div style={{ paddingLeft: "30px" }}>
                  <h4>{projectDetail?.projectName ||""}</h4>
                  <img src={projectDetail?.projectImageUrl || Img1}  style={{width:'550px',height:'260px' }}/>
                  <h4>DESCRIPTION</h4>
                  {projectDetail && projectDetail.projectDescription || ''}
                  <h4>CREATORS</h4>
                  {projectDetail?
                  projectDetail.creators.map(item=><h5 style={{ margin: "10px" }}>{item.address}</h5 >)
                  :""}
                </div>
              </td>
              
              {!isCreator && <td style={{ paddingLeft: "20px" }}>
              <div style={{backgroundColor:'black'}}>
                <table style={tab}>
                  <tr>
                    <td style={{ paddingLeft: "20px" }}>
                      <h4>DOWNLOAD</h4>
                    </td>
                    <td></td>
                    <td><h4>Token Price: ${projectDetail?.tokenprice}</h4></td>
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
              </div>
              
              </td>}
            </tr>
          </table>
          {isCreator &&  <div style={{width:'40%',background:'linear-gradient(rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)',padding:'40px'}}>
                <div style={{}}>
                  <div style={{textAlign:'left'}}>
                    <p >File Size - {projectDetail?.fileSize}</p>
                    <p>Token Price - {projectDetail?.tokenPrice}</p>
                    <p>Total Tokens - {projectDetail?.totalTokenSupply}</p>
                  </div>
                  <div style={{textAlign:'left'}}>
                    <p>Tokens Bought - {projectDetail?.tokensBought}</p>
                    <p>Token Contract Address - {projectDetail?.tokenContractAddress}</p>
                  </div>
                  <div style={{textAlign:'left'}}>
                    {/* Contract function will be called for this info */}
                    <p>Creators Share</p>
                    <p>Amount Collected</p>
                    <p><button>Claim Money</button></p>
                  </div>
                </div>
              </div>}
        </div>
      </div>
    </div>
  );
};

export default PostDescription;
