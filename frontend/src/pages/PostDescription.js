import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import image from "../images/star.png";
import Img1 from "../images/mars.jpg";
import Spinner from "react-spinners/ClipLoader";

import { BuyTokenButton } from "../components/BuyTokenButton";
import { MemoContext } from "../context/MemoContext";
import DownloadFileButton from "../components/DownloadFileButton";
import { BASE_URL, formatBytes } from "../utils";
import { NotificationManager } from "react-notifications";
import { ethers } from "ethers";
import '../styles/responsive.css'
// import moment from "moment";

const PostDescription = () => {
  const [projectDetail, setprojectDetail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [shareAmount, setShareAmount] = useState(null);
  const [downloadProcessing, setDownloadProcessing] = useState(null);
  const [purchaseProcessing, setPurchaseProcessing] = useState(null);
  const [collectShareProcessing, setCollectShareProcessing] = useState(null);
  let { projectId } = useParams();

  const [hoversub, sethoversub] = useState(false);

  const handleMouseEnter = () => {
    sethoversub(true);
  };
  const handleMouseLeave = () => {
    sethoversub(false);
  };

  const { account, checkUser, marketplaceContract, provider } =
    useContext(MemoContext);

  const navigate = useNavigate();

  const USER_TYPE = {
    CREATOR: 1,
    BOUGHT: 0,
    NEW: 2,
  };

  const getMyShareAmount = async () => {
    const shareAmount = await marketplaceContract.getMyShareAmount(projectId);
    setShareAmount(ethers.utils.formatEther(shareAmount));
  };

  const collectShares = async () => {
    const tx = await marketplaceContract.collectFunds(projectId);
    setCollectShareProcessing(true);
    const receipt = await provider.waitForTransaction(tx.hash, 1, 150000);
    setCollectShareProcessing(false);
    NotificationManager.success(shareAmount, "Royalty Amount Collected", 2000);
    window.location.reload();
  };

  const fetchProjectDetails = async () => {
    const res = await fetch(`${BASE_URL}/getProjectData/${projectId}`);
    const project = await res.json();
    setprojectDetail(project);
  };

  const setUser = async () => {
    let type = await checkUser(projectDetail.projectId);
    setUserType(type);
  };

  //  useEffect(() => {
  //    if (!account) {
  //      navigate("/explore");
  //      NotificationManager.info("Connect Your Wallet!", "Warning", 3000);
  //    }
  //  }, []);

  useEffect(() => {
    fetchProjectDetails();
    getMyShareAmount();
  }, []);

  useEffect(() => {
    if (projectDetail) setUser();
  }, [projectDetail, account]);

  const post = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const tab = {
    background:
      "linear-gradient(180deg, rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)",
    padding: "0px",
  };

  if (!projectDetail || userType == null)
    return (
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <Spinner color="white" size={100} />
      </div>
    );
  return (
    <>
      {collectShareProcessing ? (
        <div
          style={{
            marginLeft: "80px",
            color: "#1aff1a",
            padding: "2px",
            fontSize: "16px",
            border: "1px solid #1aff1a",
            width: "500px",
          }}
        >
          <b>Transferring your shares...</b>
        </div>
      ) : (
        ""
      )}
      {downloadProcessing ? (
        <div
          style={{
            marginLeft: "80px",
            color: "#1aff1a",
            padding: "2px",
            fontSize: "16px",
            border: "1px solid #1aff1a",
            width: "500px",
          }}
        >
          <b>Downloading your file...</b>
        </div>
      ) : (
        ""
      )}
      {purchaseProcessing ? (
        <div
          style={{
            marginLeft: "80px",
            color: "#1aff1a",
            padding: "2px",
            fontSize: "16px",
            border: "1px solid #1aff1a",
            width: "500px",
          }}
        >
          <b>Purchasing the token...</b>
        </div>
      ) : (
        ""
      )}

      <div style={post}>
        <div style={{ padding: "40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              overflowX: 'hidden'
            }}
          >
            <table className="tbl-responsive">
              <tr>
                <td
                  style={{
                    width: "750px",
                    backgroundColor: "rgba(7, 7, 7, 0.5)",
                  }}
                >
                  <div style={{ paddingLeft: "30px" }}>
                    <h3>
                      {projectDetail?.projectName} |{" "}
                      <span style={{fontSize:"15px"}}>
                        {/* {moment(projectDetail?.createdAt).format("DD-MM-YYYY")} */}
                      </span>
                    </h3>

                    <img
                      src={projectDetail?.projectImageUrl || Img1}
                      style={{ width: "550px", height: "260px" }}
                    />
                    <h4>DESCRIPTION</h4>
                    {projectDetail && projectDetail.projectDescription}
                    <h4>CREATORS</h4>
                    {projectDetail
                      ? projectDetail.creators.map((item) => (
                          <h5 style={{ margin: "10px" }}>
                            {item.creatorAddress} |
                            <span>
                              <a
                                style={{
                                  textDecoration: "none",
                                  color: "#658BD6",
                                }}
                                target="_blank"
                                href={item.creatorSocial}
                              >
                                {" "}
                                Social Link
                              </a>
                            </span>
                          </h5>
                        ))
                      : ""}
                  </div>
                </td>

                {userType !== USER_TYPE.CREATOR && (
                  <>
                  <td id="buyBlock" style={{ paddingLeft: "20px" }}>
                    <div>
                      <table className="innerTable" style={tab}>
                        <tr>
                          <td style={{ paddingLeft: "20px" }}>
                            <h4>DOWNLOAD</h4>
                          </td>
                          <td></td>
                          <td>
                            <h4>
                              Token Price: {projectDetail?.tokenPrice} FIL{" "}
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ width: "200px", paddingLeft: "20px" }}
                          ></td>
                          <td style={{ width: "200px" }}></td>
                          <td style={{ width: "200px" }}>
                            <h5>
                              WISHLIST
                              {userType === USER_TYPE.BOUGHT ? (
                                <DownloadFileButton
                                  projectData={projectDetail}
                                  downloadProcessing={downloadProcessing}
                                  setDownloadProcessing={setDownloadProcessing}
                                />
                              ) : (
                                <BuyTokenButton
                                  projectData={projectDetail}
                                  purchaseProcessing={purchaseProcessing}
                                  setPurchaseProcessing={setPurchaseProcessing}
                                />
                              )}
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
                          <td
                            style={{ width: "200px", paddingLeft: "20px" }}
                          ></td>
                          <td style={{ width: "200px" }}></td>
                          <td style={{ width: "200px" }}>
                            <h5>
                              WISHLIST
                              <span
                                style={{
                                  marginLeft: "30px",
                                  paddingRight: "10px",
                                }}
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
                          <td
                            style={{ width: "200px", paddingLeft: "20px" }}
                          ></td>
                          <td style={{ width: "200px" }}></td>
                          <td style={{ width: "200px" }}>
                            <h5>
                              WISHLIST
                              <span
                                style={{
                                  marginLeft: "30px",
                                  paddingRight: "10px",
                                }}
                              >
                                PURCHASE
                              </span>
                            </h5>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                  <div className="disBlock">
                    <div style={{padding:'30px',background:
                      "linear-gradient(180deg, rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)",width:'500px'}}>
                      <div style={{display:"flex",justifyContent:'space-between',}}>
                        <h4>DOWNLOAD</h4>
                        <h4>Token Price: {projectDetail?.tokenPrice} FIL{" "}</h4>
                      </div>
                      <div style={{display:"flex",justifyContent:'space-between',}}>
                        <h4>WISHLIST</h4>
                        <h4>
                        {userType === USER_TYPE.BOUGHT ? (
                          <DownloadFileButton
                            projectData={projectDetail}
                            downloadProcessing={downloadProcessing}
                            setDownloadProcessing={setDownloadProcessing}
                          />
                        ) : (
                          <BuyTokenButton
                            projectData={projectDetail}
                            purchaseProcessing={purchaseProcessing}
                            setPurchaseProcessing={setPurchaseProcessing}
                          />
                        )}
                        </h4>
                      </div>
                    </div>
                    <div style={{padding:'30px',background:
                    "linear-gradient(180deg, rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)",width:'500px'}}>
                    <div style={{display:"flex",justifyContent:'space-between',}}>
                      <h4>RENT</h4>
                      <h4></h4>
                    </div>
                    <div style={{display:"flex",justifyContent:'space-between',}}>
                      <h4>WISHLIST</h4>
                      <h4>PURCHASE</h4>
                    </div>
                    </div>
                    <div style={{padding:'30px',background:
                    "linear-gradient(180deg, rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)",width:'500px'}}>
                    <div style={{display:"flex",justifyContent:'space-between',}}>
                      <h4>PURCHASE</h4>
                      <h4></h4>
                    </div>
                    <div style={{display:"flex",justifyContent:'space-between',}}>
                      <h4>WISHLIST</h4>
                      <h4>PURCHASE</h4>
                    </div>
                    </div>
                  </div>
                  </>
                  )}
              </tr>
            </table>
            {userType === USER_TYPE.CREATOR && (
              <div
                style={{
                  width: "40%",
                  background:
                    "linear-gradient(rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)",
                  padding: "40px",
                }}
                className="fullCreatorBlock"
              >
                <div style={{}}>
                  <div style={{ textAlign: "left" }}>
                    <p>File Size - {formatBytes(projectDetail?.fileSize)}</p>
                    <p>Token Price - {projectDetail?.tokenPrice} FIL</p>
                    <p>Total Tokens - {projectDetail?.totalTokenSupply}</p>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p>Tokens Bought - {projectDetail?.tokensBought}</p>
                    <p>
                      Token Contract Address -{" "}
                      {projectDetail?.tokenContractAddress}
                    </p>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p>
                      Your Royalty Pocket: {shareAmount ? shareAmount : 0} FIL
                    </p>
                    {shareAmount > 0 && (
                      <p>
                        <button
                          style={{
                            color: hoversub ? "#658BD6" : "white",
                                  padding: "7px",
                                  background: "none",
                                  fontFamily: "Montserrat, sans-serif",
                                  cursor: "pointer",
                                  border:'1px solid #658BD6',
                                  borderRadius:'10px'
                          }}
                          onClick={collectShares}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <b>Claim Money</b>
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              </div>
             )}
             
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDescription;
