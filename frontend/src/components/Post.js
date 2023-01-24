import { useNavigate } from "react-router";

const Post = () => {
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
              <span>POST A MEMO</span>
            </h4>
          </div>
        </div>

        <div>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "20%", padding: "15px", cursor: "pointer" }}>
                <h4 onClick={() => navigate("/createpost")}>CREATE</h4>
                <h4>STORAGE</h4>
                <h4>MY MEMOS</h4>
                <h4>ANALYTICS</h4>
                <h4>ACCOUNT</h4>
              </td>
              <td style={{ width: "80%", padding: "10px" }}>
                <h3>ACTIVE PROJECTS</h3>
                <table className="tab" style={{ border: "1px solid black" }}>
                  <tr>
                    <td>
                      <h4>MUSIC</h4>
                    </td>
                    <td style={{ paddingLeft: "80px" }}>
                      <h4>CREATORS</h4>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "300px" }}>
                      <h5>
                        This record is made up of music from around the globe.
                      </h5>
                      <h5>18. 05. 2020</h5>
                    </td>
                    <td style={{ width: "250px" }}></td>
                    <td style={{ width: "200px" }}>
                      <h4>
                        {" "}
                        $ LISTEN
                        <br /> $ DOWNLOAD
                      </h4>
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
export default Post;
