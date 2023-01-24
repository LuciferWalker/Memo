import { useNavigate } from "react-router";

const Explore = () => {
  const navigate = useNavigate();

  const tab = {
    background:
      "linear-gradient(180deg, rgba(0, 27, 96, 0.7) 0%, rgba(127, 1, 1, 0) 100%)",
    padding: "3px",
  };

  return (
    <div className="explore">
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
              EXPLORE MEMOS
              <br />
              <span onClick={() => navigate("/post")}>POST A MEMO</span>
            </h4>
          </div>
        </div>

        <table>
          <tr>
            <td>
              <table style={tab}>
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
                    <h5>18.05.2023</h5>
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
            <td style={{ paddingLeft: "20px" }}>
              <table style={tab}>
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
                    <h5>18.05.2023</h5>
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
        <table style={{ marginTop: "8px" }}>
          <tr>
            <td>
              <table style={tab}>
                <tr>
                  <td>
                    <h4>ARCHIVES</h4>
                  </td>
                  <td style={{ paddingLeft: "80px" }}>
                    <h4>CREATORS</h4>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "300px" }}>
                    <h5>PROJECT DESCRIPTION</h5>
                    <h5>18.05.2023</h5>
                  </td>
                  <td style={{ width: "250px" }}></td>
                  <td style={{ width: "200px" }}>
                    <h4>
                      {" "}
                      $ JOIN COMMUNITY
                      <br /> $ DOWNLOAD
                    </h4>
                  </td>
                </tr>
              </table>
            </td>
            <td style={{ paddingLeft: "20px" }}>
              <table style={tab}>
                <tr>
                  <td>
                    <h4>ARCHIVES</h4>
                  </td>
                  <td style={{ paddingLeft: "80px" }}>
                    <h4>CREATORS</h4>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "300px" }}>
                    <h5>PROJECT DESCRIPTION</h5>
                    <h5>18.05.2023</h5>
                  </td>
                  <td style={{ width: "250px" }}></td>
                  <td style={{ width: "200px" }}>
                    <h4>
                      {" "}
                      $ JOIN COMMUNITY
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
  );
};

export default Explore;
