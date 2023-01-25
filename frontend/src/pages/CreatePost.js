import { useState } from "react";
import image from "../images/star.png";
import Navbar from "../components/Navbar";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';


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

  function uploadFile () {

      const encryptionSignature = async() =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
        const signedMessage = await signer.signMessage(messageRequested);
        return({
          signedMessage: signedMessage,
          publicKey: address
        });
      }
    
      const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
      };
    
      /* Deploy file along with encryption */
      const deployEncrypted = async(e) =>{
        /*
           uploadEncrypted(e, publicKey, accessToken, uploadProgressCallback)
           - e: js event
           - publicKey: wallets public key
           - accessToken: your api key
           - signedMessage: message signed by the owner of publicKey
           - uploadProgressCallback: function to get progress (optional)
        */
        const sig = await encryptionSignature();
        const response = await lighthouse.uploadEncrypted(
          e,
          sig.publicKey,
          "a980ea91-5a5d-4e6e-87fa-3f89f676461d",
          sig.signedMessage,
          progressCallback
        );
        console.log(response);
        /*
          output:
            {
              Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
              Size: "318557",
              Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
            }
          Note: Hash in response is CID.
        */
      
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
                    <button
                    onSubmit={uploadFile}
                      type="submit"
                      style={{
                        color: hoversub ? "#658BD6" : "white",
                        padding: "7px",
                        background: "none",
                        border: "none",
                        fontFamily: "Montserrat, sans-serif",
                        cursor: "pointer",
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <b>SUBMIT</b>
                    </button>
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
