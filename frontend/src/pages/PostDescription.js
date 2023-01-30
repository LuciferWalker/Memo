import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import image from "../images/star.png";
import Img1 from "../images/mars.jpg";
import Navbar from "../components/Navbar.js";
import { useLocation } from "react-router";

const PostDescription = () => {
  const location = useLocation();

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
    cursor:'pointer',
  };

  const gridStyle = {
      
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto',
      gridGap: '20px',
      padding: '20px',
      fontWeight:'bolder'
  }
  const gridStyle1 = {
    
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
    gridGap: '20px',
    padding: '0px 20px 20px 20px'
}

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
      <div style={{ padding: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Navbar />
        </div>
        <div>
          <table>
            <tr>
              <td
                style={{
                  width: "750px",
                  backgroundColor: "rgba(7, 7, 7, 0.5)",
                }}
              >
                <div style={{ paddingLeft: "30px" }}>
                  <h4>{projectDetail?.title ||""}</h4>
                  <img src={projectDetail?.image || Img1}  style={{width:'550px',height:'260px' }}/>
                  <h4>DESCRIPTION</h4>
                  {projectDetail && projectDetail.description || ''}
                  <h4>CREATORS</h4>
                  {projectDetail?
                  projectDetail.creatorAddresses.map(item=><h5 style={{ margin: "10px" }}>{item}</h5 >)
                  :""}
                </div>
              </td>
              
              <td style={{ paddingLeft: "20px" }}>
                {/* for user view when wallet not connected */}
              <div>
                <table style={tab}>
                  <tr>
                    <td style={{ paddingLeft: "20px" }}>
                      <h4>DOWNLOAD</h4>
                    </td>
                    <td></td>
                    <td><h4>Token Price: ${location.state.price}</h4></td>
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

              {/* for creator view when wallet is connected*/}
              {/* <div style={tab}>
                <div style={gridStyle}>
                  <div class="item1">File Size</div>
                  <div class="item2">Token Price</div>
                  <div class="item3">Total Tokens</div>  
                  <div class="item4">Tokens Bought</div>
                  <div class="item5">5 MB</div>
                  <div class="item6">$4000</div>
                  <div class="item7">5</div>
                  <div class="item8">3</div>
                </div>
                <div style={gridStyle}>
                  <div class="item1">Token Contract Address</div>
                  <div class="item2">Creators Share</div>
                </div>
                <div style={gridStyle1}>
                  <div class="item1">0x21B5e4...242714A70</div>
                  <div class="item2">50%</div>
                </div>
                <div style={gridStyle}>
                  <div class="item1">Token Contract Address</div>
                  <div class="item2">Creators Share</div>
                </div>
                <div style={gridStyle1}>
                  <div class="item1">0x21B5e4...242714A70</div>
                  <div class="item2">50%</div>
                </div>
                <div style={gridStyle}>
                  <div class="item1">Amount Collected</div>
                  <div class="item2"></div>
                </div>
                <div style={gridStyle1}>
                  <div class="item1">$2000</div>
                  <div class="item2"><button>Claim Money</button></div>
                </div>
              </div> */}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostDescription;
