import { useEffect, useState } from "react";
import UploadButton from "../components/UploadButton";
import Web3 from "web3/dist/web3.min.js";
import tick from '../images/tick.png'
import { NotificationManager } from "react-notifications";

import { useFormik } from "formik";

//ADD UPLOAD FILE OPTION IN THE FORM

const CreatePost = (props) => {
  const [formData, setFormData] = useState({
    projectName: "",
    tokenSymbol: "",
    projectDescription: "",
    projectImageUrl: "",
    tokenPrice: "",
    totalTokenSupply: "",
    numberOfCreators: "",
    creators: [],
  });

  const [loadingData,setLoadingData] = useState('');

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

  useEffect(() => {
    // setLoadingData(props.loadingdata);
    // setLoadingData('change')
  }, []);


  const [hoversub, sethoversub] = useState(false);

  const [errorn, setErrorN] = useState("");
  const [error, setError] = useState("");
  const [errord, setErrorD] = useState("");
  const [errorp, setErrorP] = useState("");
  const [errors, setErrorS] = useState("");
  const [errorc, setErrorC] = useState("");
  const [errorr, setErrorR] = useState("");
  const [erroradd, setErrorAdd] = useState("");
  const [errorsocial, setErrorSocial] = useState("");

  const [projectImage, setProjectImage] = useState(null);
  const [projectFileEvent, setProjectFileEvent] = useState(null);

  function addQuestion() {
    return formData.creators?.map((creator, index) => (
      <div
        id="creator"
        key={index}
        style={{ fontSize: "12px", marginTop: "5px",marginLeft:'170px' }}
      >
        <tr>
          <label style={{ marginLeft: "130px" }}>Social Login</label>
          <input
            placeholder="https://github.com/LuciferWalker/Memo"
            name="creatorSocial"
            onChange={(e) => {
              handleInputs(e, index);
            }}
            value={creator.creatorSocial}
            type="text"
            style={{ marginLeft: "77px", padding: "4px", width: "160px" }}
          />
          <span style={errorStyle}>{errorsocial}</span>
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>Wallet Add</label>
          <input
            placeholder="0xbE3450a8E8B3584D7722f040C386efB38913D58C"
            name="creatorAddress"
            onChange={(e) => {
              handleInputs(e, index);
            }}
            value={creator.creatorAddress}
            type="text"
            style={{ marginLeft: "83px", padding: "4px", width: "160px" }} 
          />
          <span style={errorStyle}>{erroradd}</span>
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>%Royalty Distribution</label>
          <input
            onChange={(e) => {
              handleInputs(e, index);
            }}
            name="creatorShare"
            type="number"
            min='0'
            max='100'
            value={creator.creatorShare}
            onKeyDown={blockInvalidChar}
            style={{ marginLeft: "20px", padding: "4px", width: "160px" }}
          />
        </tr>
      </div>
    ));
  }

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
        validation(key, e);
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
        validation(key, e);
      }
    } else {
      //creators data
      let value = e.target.value;
      let creatorObject = formData.creators[index];
      let updatedCreatorObject = { ...creatorObject, [key]: value };
      formData.creators[index] = updatedCreatorObject;

      setFormData({ ...formData, creators: formData.creators });
      validation(key, formData.creators[index]);
    }
  };

  const blockInvalidChar = e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

  function validation(k, e) {
    if (k== "creatorSocial" || k == "creatorShare" || k == "creatorAddress") {
      if(k == "creatorSocial"){if (e.creatorSocial == '') {
        setErrorSocial("Should not be Empty");
        return false;
      } else {
        setErrorSocial(<img src={tick}/>);
        return true;
      }}
      if(k == "creatorAddress"){if (Web3.utils.isAddress(e.creatorAddress)) {
        setErrorAdd(<img src={tick}/>);
        return true;
      } else {
        setErrorAdd("InValid Address");
        return false;
      }
      }
    } else {
      let value = e.target.value;
      // let key = k;
      if (k == "projectName") {
        if (value == "") {
          setErrorN("Should Not be Empty");
          return false;
        } else {
          setErrorN(<img src={tick}/>);
          return true;
        }
      }
      if (k == "tokenSymbol") {
        if (value == "") {
          setError("Should Not be Empty");
          return false;
        } else {
          setError(<img src={tick}/>);
          return true;
        }
      }
      if (k == "projectDescription") {
        if (value == "") {
          setErrorD("Should Not be Empty");
          return false;
        } else {
          setErrorD(<img src={tick}/>);
          return true;
        }
      }
      if (k == "tokenPrice") {
        if (value == "") {
          setErrorP("Should Not be Empty");
          return false;
        } else {
          setErrorP(<img src={tick}/>);
          return true;
        }
      }
      if (k == "totalTokenSupply") {
        if (value == "") {
          setErrorS("Should Not be Empty");
          return false;
        } else {
          setErrorS(<img src={tick}/>);
          return true;
        }
      }
      if (k == "numberOfCreators") {
        if (value == "") {
          setErrorC("Should Not be Empty");
          return false;
        } else {
          setErrorC(<img src={tick}/>);
          return true;
        }
      }
    }
  }

  const errorStyle = {
    color: "red",
    verticalAlign: "center",
    marginLeft: "5px",
  };

  const pull_data = (data) => {
    console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  }

  return (
    <>
      <div style={{ overflow: "hidden", width: "100%" }}>
        { loadingData ? 
        <><div style={{color:'#1aff1a',padding:'2px',fontSize:'16px',border:'1px solid #1aff1a',width:'500px'}}>
            <b>{loadingData}</b>
        </div><br/></>:''}
        <div
          style={{
            width: "1050px",
            height: "500px",
            overflowX: "hidden",
            overflowY: "auto",
            float:'left',
            scrollbarWidth:'thin'
          }}
        >
            <div
              style={{
                padding: "20px 0px 20px 60px",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                width: "80%",
              }}
            >
              <form>
              <table>
                {/* Project Name */}
                <div>
                  <tr>
                    <td style={{ width: "250px" }}>
                      <label>Project Name</label>
                    </td>
                    <td>
                      <input
                        placeholder="BORED APE YACHT CLUB"
                        name="projectName"
                        style={inputTag}
                        value={formData.projectName}
                        onChange={handleInputs}
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
                        placeholder="BP"
                        name="tokenSymbol"
                        style={inputTag}
                        value={formData.tokenSymbol}
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
                      <label className="custom-file-upload">Project File (.zip format)</label>
                    </td>
                    <td>
                      <input
                        name="projectFileEvent"
                        style={{
                          marginLeft: "40px",
                          padding: "8px",
                          width: "200px",
                          size:"100"
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
                        placeholder="This Project explores the NFT market"
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
                      <label>Price of each Token (in FIL)</label>
                    </td>
                    <td>
                      <input
                        placeholder="10"
                        name="tokenPrice"
                        type="number"
                        min='0'
                        style={inputTag}
                        value={formData.tokenPrice}
                        onKeyDown={blockInvalidChar}
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
                        placeholder="25"
                        type="number"
                        name="totalTokenSupply"
                        style={inputTag}
                        min='0'
                        value={formData.totalTokenSupply}
                        onKeyDown={blockInvalidChar}
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
                        type="number"
                        placeholder="2"
                        name="numberOfCreators"
                        min='1'
                        max='5'
                        value={formData.numberOfCreators}
                        onKeyDown={blockInvalidChar}
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
              <div style={{ textAlign:'center',marginTop: "10px" }}>
                <UploadButton
                  formData={formData}
                  projectImage={projectImage}
                  projectFileEvent={projectFileEvent}
                  setLoadingData={setLoadingData}
                  />
                {/* <button type="submit" onClick={handleSubmit}>
                      SUBMIT
                    </button> */}
              </div>
              </form>
            </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
