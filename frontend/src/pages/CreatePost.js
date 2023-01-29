import { useState } from "react";
import image from "../images/star.png";
import Navbar from "../components/Navbar";
import UploadButton from "../components/UploadButton";
import { useNavigate } from "react-router-dom";

//ADD UPLOAD FILE OPTION IN THE FORM

const CreatePost = () => {

  const inputTag = {
    padding: "8px",
    width: "300px",
    marginLeft: "40px",
  };

  //Unused
  const handleMouseEnter = () => {
    sethoversub(true);
  };
  const handleMouseLeave = () => {
    sethoversub(false);
  };

  const [hoversub, sethoversub] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    projectSymbol: "",
    projectDescription: "",
    projectImageUrl: "",
    tokenPrice: "",
    tokenSupply: "",
    numberOfCreators: "",
    creators: [],
  });

  const [errorn, setErrorN] = useState('');
  const [error, setError] = useState('');
  const [errord, setErrorD] = useState('');
  const [errorp, setErrorP] = useState('');
  const [errors, setErrorS] = useState('');
  const [errorc, setErrorC] = useState('');
  const [errorr, setErrorR] = useState('');

  const [projectImage, setProjectImage] = useState(null);
  const [projectFileEvent, setProjectFileEvent] = useState(null);

  function addQuestion() {
    return formData.creators?.map((creator, index) => (
      <div
        id="creator"
        key={index}
        style={{ fontSize: "12px", marginTop: "5px" }}
      >
        {/* <tr>
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
        </tr> */}
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
          <span style={errorStyle}></span>
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>%Royalty Distribution</label>
          <input
            onChange={(e) => {
              handleInputs(e, index);
            }}
            name="creatorShare"
            type="number"
            value={creator.creatorShare}
            style={{ marginLeft: "20px", padding: "4px", width: "160px" }}
            // onChange={(e) => setRoyalDist(e.target.value)}
            // value={royalDist}
          />
          <span style={errorStyle}>{errorr}</span>
        </tr>
      </div>
    ));
  }

  const showData = () => {
    console.log(formData);
  };

  const handleInputs = (e, index = -1) => {
    let key = e.target.name;

    if (index < 0) {
      //not creators data
      let value;

      if (key === "projectImage") {
        setProjectImage(e.target.files[0]);
      } else if (key === "projectFileEvent") {
        setProjectFileEvent(e);
      } else if (key === "numberOfCreators") {
        let arr;
        let value = e.target.value;
        validation(key,e)
        if (value === "") {
          arr = Array.from(Array(parseInt("0")), () => ({}));
        } else {
          arr = Array.from(Array(parseInt(value)), () => ({})); //[]
        }
        setFormData({
          ...formData,
          [key]: value,
          creators: arr,
        });
      } else {
        let value = e.target.value;
        setFormData({ ...formData, [key]: value });
        validation(key,e);
      }
    } else {
      //creators data
      let value = e.target.value;
      let creatorObject = formData.creators[index];
      let updatedCreatorObject = { ...creatorObject, [key]: value };
      formData.creators[index] = updatedCreatorObject;
      setFormData({ ...formData, creators: formData.creators });
      validation(key,e);
    }
  };

  function validation(k,e){
    let value = e.target.value;
    // let key = k;
    if(k == 'projectName'){
      if(value == ''){setErrorN('Should Not be Empty');}else{setErrorN('')}
    }
    if(k == 'projectSymbol'){
      if(value == ''){setError('Should Not be Empty');}else{setError('')}
    }
    if(k == 'projectDescription'){
      if(value == ''){setErrorD('Should Not be Empty');}else{setErrorD('')}
    }
    if(k == 'tokenPrice'){
      if(value == ''){setErrorP('Should Not be Empty');}else{setErrorP('')}
    }
    if(k == 'tokenSupply'){
      if(value == ''){setErrorS('Should Not be Empty');}else{setErrorS('')}
    }
    if(k == 'numberOfCreators'){
      if(value == ''){setErrorC('Should Not be Empty');}else{setErrorC('')}
    } 
    if(k == 'creatorShare'){
      if(value == ''){setErrorR('Should Not be Empty');}else{setErrorR('')}
    }  
  }

  const errorStyle = {
    color:'red', verticalAlign:'center',marginLeft:'5px'
  }

  return (
        <div>
          <div style={{ overflow: "hidden", width: "100%" }}>
            <div
              style={{
                width: "90%",
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
                    width: "100%",
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
                          <span style={errorStyle}>{errorn}</span>
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
                        <span style={errorStyle}>{error}</span>
                      </tr>
                    </div>
                    {/* Project Image */}
                    <div>
                      <tr>
                        <td style={{ width: "250px" }}>
                          <label>Project Image</label>
                        </td>
                        <td>
                          <input
                            name="projectImage"
                            type="file"
                            accept="image/png, image/gif, image/jpeg, image/jpg"
                            onChange={handleInputs}
                            style={{
                              marginLeft: "40px",
                              padding: "8px",
                              width: "200px",
                            }}
                          />
                        </td>
                      </tr>
                    </div>
                    {/* Project File */}
                    <div style={{ marginTop: "10px" }}>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ width: "250px" }}>
                          <label>Project File (.zip format)</label>
                        </td>
                        <td>
                          <input
                            name="projectFileEvent"
                            style={{
                              marginLeft: "40px",
                              padding: "8px",
                              width: "200px",
                            }}
                            accept="application/zip"
                            type="file"
                            onChange={handleInputs}
                          />
                        </td>
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
                          <span style={errorStyle}>{errord}</span>
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
                          <span style={errorStyle}>{errorp}</span>
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
                            type="number"
                            name="tokenSupply"
                            style={inputTag}
                            value={formData.tokenSupply}
                            onChange={handleInputs}
                          />
                          <span style={errorStyle}>{errors}</span>
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
                          <span style={errorStyle}>{errorc}</span>
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
                    <UploadButton
                      formData={formData}
                      projectImage={projectImage}
                      projectFileEvent={projectFileEvent}
                    />
                    {/* <button type="submit" onClick={handleSubmit}>
                      SUBMIT
                    </button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
};

export default CreatePost;
