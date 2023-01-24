import { useNavigate } from "react-router";

const CreatePost = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ padding: "60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <SignIn /> */}
          <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <h1>MEMO</h1>
            <h5>01.01.2023</h5>
          </div>
          <div style={{ cursor: "pointer" }}>
            <h4>
              CONNECT WALLET
              <br />
              <span onClick={() => navigate("/explore")}>EXPLORE MEMOS</span>
              <br />
              <span onClick={() => navigate("/post")}>POST A MEMO</span>
            </h4>
          </div>
        </div>

        <div>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "160px", padding: "15px" }}>
                <h4>CREATE</h4>
                <h4>STORAGE</h4>
                <h4>MY MEMOS</h4>
                <h4>ANALYTICS</h4>
                <h4>ACCOUNT</h4>
              </td>
              <td style={{ width: "300px", padding: "10px" }}>
                <form action="/">
                  <div
                    style={{
                      padding: "20px 0px 30px 80px",
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
                        <tr>
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
                              <option value="v">Buy License</option>
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
                            <label>Creators</label>
                          </td>
                          <td>
                            <input
                              style={{
                                padding: "8px",
                                width: "300px",
                                marginLeft: "40px",
                              }}
                              id="creator"
                            />
                          </td>
                        </tr>
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <tr>
                          <td style={{ width: "250px" }}>
                            <label>Royalty Distribution</label>
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
                    </table>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                      <button type="submit" href="/">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
