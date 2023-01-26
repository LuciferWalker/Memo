import { useState } from "react";
import { useNavigate } from "react-router";
import image from "../images/star.png";
import Navbar from "../components/Navbar.js";

const Post = () => {
  const navigate = useNavigate();

  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const post = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div style={post}>
      <div style={{ padding: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Navbar color="#658BD6" />
        </div>

        <div>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "20%", padding: "15px", cursor: "pointer" }}>
                <h4
                  style={{ color: hover ? "#658BD6" : "white" }}
                  onClick={() => navigate("/createpost")}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  CREATE
                </h4>
                <h4>STORAGE</h4>
                <h4>CREATED MEMOS</h4>
                <h4>BOUGHT MEMOS</h4>
                <h4>ANALYTICS</h4>
                <h4>ACCOUNT</h4>
              </td>
              <td style={{ width: "80%", padding: "10px" }}>
                <h3>ACTIVE PROJECTS</h3>
                <table
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 27, 96, 0.7) 0%, rgba(127, 1, 1, 0) 100%)",
                    padding: "0px",
                  }}
                >
                  <tr>
                    <td style={{ paddingLeft: "40px" }}>
                      <h5>MUSIC</h5>
                    </td>
                    <td style={{ paddingLeft: "80px" }}>
                      <h5>CREATORS</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "340px", paddingLeft: "40px" }}>
                      <h5>
                        This record is made up of music from around the globe.
                      </h5>
                      <h5>18. 05. 2020</h5>
                    </td>
                    <td style={{ width: "270px" }}></td>
                    <td style={{ width: "200px" }}>
                      <h5>
                        {" "}
                        $ LISTEN
                        <br /> $ DOWNLOAD
                      </h5>
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
