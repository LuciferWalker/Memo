import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import image from "../images/star.png";

const Home = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  const handleMouseEnter1 = () => {
    setHover1(true);
  };
  const handleMouseLeave1 = () => {
    setHover1(false);
  };

  const Bg = {
    height: "100vh",
    background:
      "linear-gradient(180deg, rgba(129, 0, 0, 0) 0%, rgba(99, 111, 128, 0.6) 50%, rgba(29, 0, 208, 0) 100%)",
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

    return(
        <div style={Bg}>
            <div style={{padding:'40px'}}>
                
                <h3 style={{textAlign:'center',marginTop:'30px'}}>MEMO IS A BLUEPRINT TO STORE HUMANITY’S DREAMS, DISCOVERIES & MEMORIES.</h3>

        <table style={{ marginTop: "70px" }}>
          <tr>
            <td style={{width:'45%'}}>
              <h4>
                Memo is inspired by the golden record sent out to space on
                Voyager 2 in 1997. The record contained information about our
                planet, our species as well as other life on earth.
              </h4>
              <br />
              <h4>
                Memo aims to create a real-time record of humanity and planet
                earth as we breathe and live. We hope to send this record to
                space as a window into our everyday lives.{" "}
              </h4>
            </td>
            <td style={{width:'10%'}}></td>
            <td style={{width:'45%'}}>
              <h4>
                What is a memo ? <br />
                A memo is an expression made up of words, images or audio. It
                can be music, movies, books, forums, anything!
                <br />
                <br />
                Find your social rhythm with:
                <ul>
                  <li>Creating new memos.</li>
                  <li>Sharing memos. </li>
                  <li>Downloading memos. </li>
                </ul>
              </h4>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Home;
