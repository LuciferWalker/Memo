import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MemoContext } from "../context/MemoContext";
import image from "../images/star.png";
import { NotificationManager } from "react-notifications";

const CreatedMemos = () => {
  const navigate = useNavigate();

  const [creatememo, setCreateMemo] = useState(true);
  const [createdProjects, setCreatedProjects] = useState(null);
  const [boughtProjects, setBoughtProjects] = useState(null);

  const { account:userAddress } = useContext(MemoContext);

  const getCreatedProjects = async (userAddress) => {
    const response = await fetch(
      `http://localhost:3001/createdProjects?address=${userAddress}`
    );
    const projects = await response.json();
    setCreatedProjects(projects);
  };

  const getBoughtProjects = async (userAddress) => {
    const response = await fetch(
      `http://localhost:3001/boughtProjects?address=${userAddress}`
    );
    const projects = await response.json();
    setBoughtProjects(projects);
  };

  useEffect(() => {
    // let { userAddress } = getUserWalletDetails();
    // console.log(userAddress)
    getCreatedProjects(userAddress);
    getBoughtProjects(userAddress);

    if (!userAddress) {
      navigate("/");
      NotificationManager.info("Connect Your Wallet!", "Warning", 3000);
    }
  }, []);



  return (
    <>
      {creatememo && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "440px",
            overflowY: "auto",
          }}
        >
          <h2>CREATED PROJECTS</h2>
          {createdProjects == null ? (
            <h3 style={{ color: "white" }}>
              No Projects Created, yet &#59;&#41;
            </h3>
          ) : (
            createdProjects?.map((card, index) => (
              <>
                <table
                  key={index}
                  onClick={() => navigate(`/explore/${card.projectId}`)}
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
                <br />
              </>
            ))
          )}
        </div>
      )}
    </>
  );
};
export default CreatedMemos;
