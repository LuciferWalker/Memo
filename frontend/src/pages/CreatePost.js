import { useState } from "react";
import image from "../images/star.png";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import { lighthouse } from "@lighthouse-web3/sdk";
import UploadButton from "../components/UploadButton";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

//ADD UPLOAD FILE OPTION IN THE FORM

const CreatePost = () => {
  const [hoversub, sethoversub] = useState(false);
  const [distribution, setDistribution] = useState(0);
  const [members, setMembers] = useState([]);

  const [projTitle, setprojTitle] = useState('');
  const [projDesc, setprojDesc] = useState('');
  const [price, setPrice] = useState(0);
  const [supply, setSupply] = useState('');
  const [royalDist, setRoyalDist] = useState(0);
  const [img, setImg] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);

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
            onChange={(e) => setRoyalDist(e.target.value)}
            value={royalDist}
          />
        </tr>
      </div>
    ));
  }

  const uploadImage = () => {
    if(!img) return alert("First select an Image")
    const storage = getStorage(app);
    const fileName = img.name + new Date().getTime();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
        console.log(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {console.log(error)},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          // This url will be stored in the web2 backend
          setImgUrl(downloadURL)
        });
      }
    );
  };

  const inputTag = {
    padding: "8px",
    width: "300px",
    marginLeft: "40px",
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/display", {
      state: {
          title: projTitle,
          desc: projDesc,
          price:price,
          creators:distribution,
      }})
  };

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
                <h4>CREATED MEMOS</h4>
                <h4>BOUGHT MEMOS</h4>
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
              <form action="">
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
                            style={inputTag}
                            value={projTitle}
                            onChange={(e) => setprojTitle(e.target.value)}
                          />
                        </td>
                      </tr>
                    </div>
                    <div>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Project Image</label>
                        </td>
                        {!imgUrl?<td>
                          <input
                            type='file'
                            onChange={(e)=>setImg(e.target.files[0])}
                            style={{
                              marginLeft: "40px",
                              padding: "8px",
                              width: "200px",
                            }}
                          />
                          <button type="button" onClick={uploadImage}>Upload Image</button>
                        </td>:<p>{img?.name}</p>}
                      </tr>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ width: "250px" }}>
                          <label>Project Description</label>
                        </td>
                        <td>
                          <textarea
                            style={inputTag}
                            rows="2"
                            value={projDesc}
                            onChange={(e) => setprojDesc(e.target.value)}
                          ></textarea>
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
                            style={inputTag}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
                            style={inputTag}
                            value={supply}
                            onChange={(e) => setSupply(e.target.value)}
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
                            style={inputTag}
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
                    {/* <UploadButton /> */}<button type="submit" onClick={handleSubmit}>SUBMIT</button>
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
