import { useState } from "react";
import image from "../images/star.png";
import Navbar from "../components/Navbar";
import UploadButton from "../components/UploadButton";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";


//ADD UPLOAD FILE OPTION IN THE FORM

const CreatePost = () => {
  const [hoversub, sethoversub] = useState(false);
  const [distribution, setDistribution] = useState();
  const [members, setMembers] = useState([]);

  const handleMouseEnter = () => {
    sethoversub(true);
  };
  const handleMouseLeave = () => {
    sethoversub(false);
  };

  const createpost = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const handleChange = (event) => {
    const creators = event.target.value;
    setDistribution(event.target.value);

    if (creators > 0) {
      const generateArrays = Array.from(
        Array(Number(event.target.value)).keys()
      );
      setMembers(generateArrays);
    } else {
      setMembers([]);
    }
  };

  function addQuestion() {
    return members.map((quest) => (
      <div style={{ fontSize: "12px", marginTop: "5px" }}>
        <tr>
          <label style={{ marginLeft: "130px" }}>
            Creator Name {quest + 1}
          </label>
          <input
            type="text"
            style={{ marginLeft: "56px", padding: "4px", width: "160px" }}
          />
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>Social Login</label>
          <input
            type="text"
            style={{ marginLeft: "77px", padding: "4px", width: "160px" }}
          />
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>Wallet Add</label>
          <input
            type="text"
            style={{ marginLeft: "83px", padding: "4px", width: "160px" }}
          />
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>%Royalty Distribution</label>
          <input
            type="text"
            style={{ marginLeft: "20px", padding: "4px", width: "160px" }}
          />
        </tr>
      </div>
    ));
  }

  return (
    <div style={createpost}>
      <div style={{ padding: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Navbar />
        </div>

        <div>
          <div style={{ overflow: "hidden", width: "100%" }}>
            <div
              style={{
                width: "25%",
                height: "auto",
                overflow: "hidden",
                float: "left",
              }}
            >
              <ul>
                <h4 style={{ color: "#658BD6" }}>CREATE</h4>
                <h4>STORAGE</h4>
                <h4>MY MEMOS</h4>
                <h4>ANALYTIC</h4>
                <h4>ACCOUNT</h4>
              </ul>
            </div>
            <div
              style={{
                width: "60%",
                height: "450px",
                overflowX: "hidden",
                overflowY: "auto",
                float: "left",
              }}
            >
              <form action="/">
                <div
                  style={{
                    padding: "20px 0px 20px 60px",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    width: "800px",
                  }}
                >
                  <table>
                    <div>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Project Title</label>
                        </td>
                        <td>
                          <input
                            style={{
                              marginLeft: "40px",
                              padding: "8px",
                              width: "300px",
                            }}
                          />
                        </td>
                      </tr>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ width: "250px" }}>
                          <label>Project Description</label>
                        </td>
                        <td>
                          <textarea
                            style={{
                              marginLeft: "40px",
                              padding: "8px",
                              width: "302px",
                            }}
                            rows="2"
                          ></textarea>
                        </td>
                      </tr>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Access Token</label>
                        </td>
                        <td>
                          <select
                            style={{
                              marginLeft: "40px",
                              padding: "8px",
                              width: "320px",
                            }}
                          >
                            <option value="" disabled selected>
                              Select Token
                            </option>
                            <option value="b">Pay Per View</option>
                            <option value="ch">Download</option>
                            <option value="v">Buy h4cense</option>
                            <option value="n">Asset</option>
                          </select>
                        </td>
                      </tr>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Price of each Token</label>
                        </td>
                        <td>
                          <input
                            style={{
                              padding: "8px",
                              width: "300px",
                              marginLeft: "40px",
                            }}
                          />
                        </td>
                      </tr>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Supply</label>
                        </td>
                        <td>
                          <input
                            style={{
                              padding: "8px",
                              width: "300px",
                              marginLeft: "40px",
                            }}
                          />
                        </td>
                      </tr>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>No. of Creators</label>
                        </td>
                        <td>
                          <input
                            id="creator"
                            value={distribution}
                            style={{
                              padding: "8px",
                              width: "300px",
                              marginLeft: "40px",
                            }}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    </div>
                    <div>
                      <tr>
                        <td>Royalty Distribution</td>
                        <td>{members.length ? <>{addQuestion()}</> : null}</td>
                      </tr>
                    </div>
                  </table>
                  <div style={{ marginLeft: "270px", marginTop: "20px" }}>
                    <UploadButton />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
