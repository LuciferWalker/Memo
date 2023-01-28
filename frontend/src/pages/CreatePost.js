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
import { parse } from "@ethersproject/transactions";
// React Notification
// import { NotificationManager } from "react-notifications";

//ADD UPLOAD FILE OPTION IN THE FORM

const CreatePost = () => {
  //Styles

  const createpost = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const inputTag = {
    padding: "8px",
    width: "300px",
    marginLeft: "40px",
  };

  const [hoversub, sethoversub] = useState(false);
  const [distribution, setDistribution] = useState(0);

  const [formData, setFormData] = useState({
    projectName: "",
    projectSymbol: "",
    projectDescription: "",
    projectImage: "",
    tokenPrice: "",
    tokenSupply: "",
    numberOfCreators: "",
    creators: [],
  });

  const [creator, setCreator] = useState({});

  const [projectName, setProjectName] = useState("");
  const [projectSymbol, setProjectSymbol] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [supply, setSupply] = useState("");
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

  // const handleChange = (event) => {
  //   const creators = event.target.value;

  //   setDistribution(event.target.value);

  //   if (creators > 0) {
  //     const generateArrays = Array.from(
  //       Array(Number(event.target.value)).keys()
  //     );
  //     setMembers(generateArrays);
  //   } else {
  //     setMembers([]);
  //   }
  // };

  function addQuestion() {
    return formData.creators?.map((creator, index) => (
      <div
        id="creator"
        key={index}
        style={{ fontSize: "12px", marginTop: "5px" }}
      >
        <tr>
          <label style={{ marginLeft: "130px" }}>
            Creator Name {index + 1}
          </label>
          <input
            type="text"
            value={creator.creatorName}
            onChange={(e) => {
              handleInputs(e, index);
            }}
            name="creatorName"
            style={{ marginLeft: "56px", padding: "4px", width: "160px" }}
          />
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>Social Login</label>
          <input
            name="creatorSocial"
            onChange={(e) => {
              handleInputs(e, index);
            }}
            value={creator.creatorSocial}
            type="text"
            style={{ marginLeft: "77px", padding: "4px", width: "160px" }}
          />
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>Wallet Add</label>
          <input
            name="creatorAddress"
            onChange={(e) => {
              handleInputs(e, index);
            }}
            value={creator.creatorAddress}
            type="text"
            style={{ marginLeft: "83px", padding: "4px", width: "160px" }}
          />
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>%Royalty Distribution</label>
          <input
            onChange={(e) => {
              handleInputs(e, index);
            }}
            name="creatorShare"
            type="text"
            value={creator.creatorShare}
            style={{ marginLeft: "20px", padding: "4px", width: "160px" }}
            // onChange={(e) => setRoyalDist(e.target.value)}
            // value={royalDist}
          />
        </tr>
      </div>
    ));
  }

  const uploadImage = () => {
    // if (!img) return alert("First select an Image");
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
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          // This url will be stored in the web2 backend
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    uploadImage(); //upload image

    e.preventDefault();
    navigate("/display", {
      state: {
        title: projectName,
        desc: projectDescription,
        price: price,
        creators: distribution,
        royal: royalDist,
      },
    });
    // NotificationManager.success("Form Submitted!", "Successful!", 2000);
  };

  const showData = () => {
    console.log(formData);
  };

  const handleInputs = (e, index = -1) => {
    let key = e.target.name;

    if (index < 0) {
      //not creators data
      let value;

      key === "projectImage"
        ? (value = e.target.files[0])
        : (value = e.target.value);

      if (key === "numberOfCreators") {
        //value not equal to empty string
        let arr;
        if (value === "") {
          arr = Array.from(Array(parseInt("0")), () => ({}));
        } else {
          arr = Array.from(Array(parseInt(value)), () => ({}));
        }
        setFormData({
          ...formData,
          [key]: value,
          creators: arr,
        });
      } else {
        setFormData({ ...formData, [key]: value });
      }
    } else {
      //creators data
      let value = e.target.value;
      let creatorObject = formData.creators[index];
      let updatedCreatorObject = { ...creatorObject, [key]: value };
      formData.creators[index] = updatedCreatorObject;
      setFormData({ ...formData, creators: formData.creators });
    }
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
              <button onClick={showData}>Show form data</button>

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
                    {/* Project Name */}
                    <div>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Project Name</label>
                        </td>
                        <td>
                          <input
                            name="projectName"
                            style={inputTag}
                            value={formData.projectName}
                            onChange={handleInputs}
                            // (e) => setFormData(e.target.value)
                          />
                        </td>
                      </tr>
                    </div>
                    {/* Project Symbol */}
                    <div>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Project Symbol</label>
                        </td>
                        <td>
                          <input
                            name="projectSymbol"
                            style={inputTag}
                            value={formData.projectSymbol}
                            onChange={handleInputs}
                          />
                        </td>
                      </tr>
                    </div>
                    {/* Project Image */}
                    <div>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Project Image</label>
                        </td>
                        {!imgUrl ? (
                          <td>
                            <input
                              name="projectImage"
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={handleInputs}
                              style={{
                                marginLeft: "40px",
                                padding: "8px",
                                width: "200px",
                              }}
                            />
                          </td>
                        ) : (
                          <p>{img?.name}</p>
                        )}
                      </tr>
                    </div>
                    {/* Project Description */}
                    <div style={{ marginTop: "10px" }}>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ width: "250px" }}>
                          <label>Project Description</label>
                        </td>
                        <td>
                          <textarea
                            name="projectDescription"
                            style={inputTag}
                            rows="2"
                            value={formData.projectDescription}
                            onChange={handleInputs}
                          ></textarea>
                        </td>
                      </tr>
                    </div>
                    {/* Token Price */}
                    <div style={{ marginTop: "10px" }}>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Price of each Token (in Wei)</label>
                        </td>
                        <td>
                          <input
                            name="tokenPrice"
                            type="number"
                            style={inputTag}
                            value={formData.tokenPrice}
                            onChange={handleInputs}
                          />
                        </td>
                      </tr>
                    </div>
                    {/* Token Supply */}
                    <div style={{ marginTop: "10px" }}>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Token Supply</label>
                        </td>
                        <td>
                          <input
                            name="tokenSupply"
                            style={inputTag}
                            value={formData.tokenSupply}
                            onChange={handleInputs}
                          />
                        </td>
                      </tr>
                    </div>
                    {/* Number of Creators */}
                    <div style={{ marginTop: "10px" }}>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>No. of Creators</label>
                        </td>
                        <td>
                          <input
                            name="numberOfCreators"
                            value={formData.numberOfCreators}
                            style={inputTag}
                            onChange={handleInputs}
                          />
                        </td>
                      </tr>
                    </div>
                    <div>
                      <tr>
                        <td>{addQuestion()}</td>
                      </tr>
                    </div>
                  </table>
                  <div style={{ marginLeft: "270px", marginTop: "20px" }}>
                    {/* <UploadButton /> */}
                    <button type="submit" onClick={handleSubmit}>
                      SUBMIT
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
