import { useState } from "react";
import UploadButton from "../components/UploadButton";
import Web3 from "web3/dist/web3.min.js";

import { useFormik } from "formik";
import Dashboard from "../components/Dashboard";

//ADD UPLOAD FILE OPTION IN THE FORM

const CreatePosttry = () => {
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

  const { errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: formData,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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

  //   const [errorn, setErrorN] = useState("");
  //   const [error, setError] = useState("");
  //   const [errord, setErrorD] = useState("");
  //   const [errorp, setErrorP] = useState("");
  // //   const [errors, setErrorS] = useState("");
  //   const [errorc, setErrorC] = useState("");
  //   const [errorr, setErrorR] = useState("");
  //   const [erroradd, setErrorAdd] = useState("");

  //   const [projectImage, setProjectImage] = useState(null);
  //   const [projectFileEvent, setProjectFileEvent] = useState(null);

  function addQuestion() {
    return formData.creators?.map((creator, index) => (
      <div
        id="creator"
        key={index}
        style={{ fontSize: "12px", marginTop: "5px" }}
      >
        <tr>
          <label style={{ marginLeft: "130px" }}>Social Login</label>
          <input
            placeholder="https://github.com/LuciferWalker/Memo"
            name="creatorSocial"
            value={values.creatorSocial}
            onChange={handleChange}
            onBlur={handleBlur}
            // onChange={(e) => {
            //   handleInputs(e, index);
            // }}
            type="text"
            style={{ marginLeft: "77px", padding: "4px", width: "160px" }}
          />
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>Wallet Add</label>
          <input
            placeholder="0xbE3450a8E8B3584D7722f040C386efB38913D58C"
            name="creatorAddress"
            value={values.creatorAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            // onChange={(e) => {
            //   handleInputs(e, index);
            // }}
            type="text"
            style={{ marginLeft: "83px", padding: "4px", width: "160px" }}
          />
        </tr>
        <tr>
          <label style={{ marginLeft: "130px" }}>%Royalty Distribution</label>
          <input
            // onChange={(e) => {
            //   handleInputs(e, index);
            // }}
            value={values.creatorShare}
            onChange={handleChange}
            onBlur={handleBlur}
            name="creatorShare"
            type="number"
            style={{ marginLeft: "20px", padding: "4px", width: "160px" }}
            // onChange={(e) => setRoyalDist(e.target.value)}
            // value={royalDist}
          />
        </tr>
      </div>
    ));
  }

  const showData = () => {
    console.log(formData);
  };

  //   const handleInputs = (e, index = -1) => {
  //     let key = e.target.name;

  //     if (index < 0) {
  //       //not creators data
  //       let value;

  //       if (key === "projectImage") {
  //         setProjectImage(e.target.files[0]);
  //       } else if (key === "projectFileEvent") {
  //         setProjectFileEvent(e);
  //       } else if (key === "numberOfCreators") {
  //         let arr;
  //         let value = e.target.value;
  //         validation(key, e);
  //         if (value === "") {
  //           arr = Array.from(Array(parseInt("0")), () => ({}));
  //         } else {
  //           arr = Array.from(Array(parseInt(value)), () => ({})); //[]
  //         }
  //         setFormData({
  //           ...formData,
  //           [key]: value,
  //           creators: arr,
  //         });
  //       } else {
  //         let value = e.target.value;
  //         setFormData({ ...formData, [key]: value });
  //         validation(key, e);
  //       }
  //     } else {
  //       //creators data
  //       let value = e.target.value;
  //       let creatorObject = formData.creators[index];
  //       let updatedCreatorObject = { ...creatorObject, [key]: value };
  //       formData.creators[index] = updatedCreatorObject;

  //       setFormData({ ...formData, creators: formData.creators });
  //       console.log(formData.creators[index]);
  //       validation(key, formData.creators[index]);
  //     }
  //   };

  //   function validation(k, e) {
  //     if (k == "creatorShare" || k == "creatorAddress") {
  //       // if(k == 'creatorShare'){
  //       // console.log(e.creators);
  //       if (e.creatorShare < 100) {
  //         setErrorR("Empty");
  //       } else {
  //         setErrorR("");
  //       }
  //       if (Web3.utils.isAddress(e.creatorAddress)) {
  //         setErrorAdd("Valid");
  //       } else {
  //         setErrorAdd("Not Valid");
  //       }
  //       // }
  //     } else {
  //       let value = e.target.value;
  //       // let key = k;
  //       if (k == "projectName") {
  //         if (value == "") {
  //           setErrorN("Should Not be Empty");
  //         } else {
  //           setErrorN("");
  //         }
  //       }
  //       if (k == "tokenSymbol") {
  //         if (value == "") {
  //           setError("Should Not be Empty");
  //         } else {
  //           setError("");
  //         }
  //       }
  //       if (k == "projectDescription") {
  //         if (value == "") {
  //           setErrorD("Should Not be Empty");
  //         } else {
  //           setErrorD("");
  //         }
  //       }
  //       if (k == "tokenPrice") {
  //         if (value == "") {
  //           setErrorP("Should Not be Empty");
  //         } else {
  //           setErrorP("");
  //         }
  //       }
  //       if (k == "totalTokenSupply") {
  //         if (value == "") {
  //           setErrorS("Should Not be Empty");
  //         } else {
  //           setErrorS("");
  //         }
  //       }
  //       if (k == "numberOfCreators") {
  //         if (value == "") {
  //           setErrorC("Should Not be Empty");
  //         } else {
  //           setErrorC("");
  //         }
  //       }
  //     }
  //   }

  const errorStyle = {
    color: "red",
    verticalAlign: "center",
    marginLeft: "5px",
  };

  // return(
  //   <>
  //     create project
  //   </>
  // )
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

          <form onSubmit={handleSubmit}>
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
                        placeholder="BORED APE YACHT CLUB"
                        name="projectName"
                        style={inputTag}
                        value={values.projectName}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        placeholder="BP"
                        name="tokenSymbol"
                        style={inputTag}
                        value={values.tokenSymbol}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    <td>
                      <input
                        name="projectImage"
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/jpg"
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        value={values.projectDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        placeholder="100000000000000000"
                        name="tokenPrice"
                        type="number"
                        style={inputTag}
                        value={values.tokenPrice}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        placeholder="25"
                        type="number"
                        name="totalTokenSupply"
                        style={inputTag}
                        value={values.totalTokenSupply}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        placeholder="2"
                        name="numberOfCreators"
                        value={values.numberOfCreators}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                {/* <UploadButton
                  formData={formData}
                  projectImage={projectImage}
                  projectFileEvent={projectFileEvent}
                /> */}
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

export default CreatePosttry;