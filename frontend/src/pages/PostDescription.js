import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import image from "../images/star.png";
import Img1 from "../images/mars.jpg";

import { BuyTokenButton } from "../components/BuyTokenButton";
import { MemoContext } from "../context/MemoContext";
import DownloadFileButton from "../components/DownloadFileButton";
import { formatBytes } from "../utils";
import { NotificationManager } from "react-notifications";

const PostDescription = () => {
  const [projectDetail, setprojectDetail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [shareAmount, setShareAmount] = useState(0);
  let { projectId } = useParams();

  const { account, checkUser, marketplaceContract, provider } = useContext(MemoContext);

  const USER_TYPE = {
    CREATOR: 1,
    BOUGHT: 0,
    NEW: 2,
  };

  const getMyShareAmount = async () => {
    setShareAmount(await marketplaceContract.getMyShareAmount(projectId));
  };

  const collectShares = async () => {
    const tx = await marketplaceContract.collectFunds(projectId);
    const receipt = await provider.waitForTransaction(tx.hash, 1, 150000);

    NotificationManager.success("Amount Collected", shareAmount, 2000);
    window.location.reload();
  };

  const fetchProjectDetails = async () => {
    const res = await fetch(
      "http://localhost:3001/getProjectData/" + projectId
    );
    const project = await res.json();
    setprojectDetail(project);
  };

  const setUser = async () => {
    let type = await checkUser(projectDetail.projectId);
    console.log(type)
    setUserType(type);
  };

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


  return (
    <>
      <div style={post}>
        <div style={{ padding: "40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <table>
              <tr>
                <td
                  style={{
                    width: "750px",
                    backgroundColor: "rgba(7, 7, 7, 0.5)",
                  }}
                >
                  <div style={{ paddingLeft: "30px" }}>
                    <h4>{projectDetail?.projectName || ""}</h4>
                    <img
                      src={projectDetail?.projectImageUrl || Img1}
                      style={{ width: "550px", height: "260px" }}
                    />
                    <h4>DESCRIPTION</h4>
                    {(projectDetail && projectDetail.projectDescription) || ""}
                    <h4>CREATORS</h4>
                    {projectDetail
                      ? projectDetail.creators.map((item) => (
                          <h5 style={{ margin: "10px" }}>
                            {item.creatorAddress}
                            {item.creatorSocial}
                          </h5>
                        ))
                      : ""}
                  </div>
                </td>

                {userType !== USER_TYPE.CREATOR && (
                  <td style={{ paddingLeft: "20px" }}>
                    <div>
                      <table style={tab}>
                        <tr>
                          <td style={{ paddingLeft: "20px" }}>
                            <h4>DOWNLOAD</h4>
                          </td>
                          <td></td>
                          <td>
                            <h4>Token Price: ${projectDetail?.tokenprice}</h4>
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
                              {userType === USER_TYPE.BOUGHT ? (
                                <DownloadFileButton
                                  projectData={projectDetail}
                                />
                              ) : (
                                <BuyTokenButton projectData={projectDetail} />
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
                          <td style={{ width: "200px", paddingLeft: "20px" }}>
                            <h5>18.05.2023</h5>
                          </td>
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
                          <td style={{ width: "200px", paddingLeft: "20px" }}>
                            <h5>18.05.2023</h5>
                          </td>
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
                    {/* Contract function will be called for this info */}
                    <p>Your royalty pocket: {shareAmount} FIL</p>
                    <p>
                      <button onClick={collectShares}>Claim Money</button>
                    </p>
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
