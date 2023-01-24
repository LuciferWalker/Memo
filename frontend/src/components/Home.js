import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const Bg = {
    width: "196.5vh",
    height: "100vh",
    background:
      "linear-gradient(180deg, rgba(129, 0, 0, 0) 0%, rgba(99, 111, 128, 0.6) 50%, rgba(29, 0, 208, 0) 100%)",
  };

  return (
    <div style={Bg}>
      <div style={{ padding: "60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <SignIn /> */}
          <div>
            <h1>MEMO</h1>
            <h5>01.01.2023</h5>
          </div>
          <div style={{ cursor: "pointer" }}>
            <h4>
              <span onClick={() => navigate("/explore")}>EXPLORE MEMOS</span>
              <br />
              <span onClick={() => navigate("/post")}>POST A MEMO</span>
            </h4>
          </div>
        </div>
        <h3 style={{ textAlign: "center", marginTop: "50px" }}>
          MEMO IS A BLUEPRINT TO STORE HUMANITY’S DREAMS, DISCOVERIES &
          MEMORIES.
        </h3>

        <table style={{ marginTop: "100px" }}>
          <tr>
            <td style={{ width: "40%" }}>
              <h4>
                Memo is inspired by the golden record sent out to space on
                Voyager 2 in 1997. The record contained information about our
                planet, our species as well as other life on earth.
              </h4>
            </td>
            <td style={{ width: "15%" }}></td>
            <td>
              <h4>
                Memo aims to create a real-time record of humanity and planet
                earth as we breathe and live. We hope to send this record to
                space as a window into our everyday lives.{" "}
              </h4>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Home;
