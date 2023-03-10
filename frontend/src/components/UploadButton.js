import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
// React Notification
import { NotificationManager } from "react-notifications";
import { MemoContext } from "../context/MemoContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

function UploadButton({
  formData,
  projectImage,
  projectFileEvent,
  setLoadingData,
}) {
  const navigate = useNavigate();

  const { marketplaceContract } = useContext(MemoContext);
  const [loader, setLoader] = useState(null);
  const FLOW = {
    1: "Encrypting and Uploading File to IPFS",
    2: "Deploying Your Token Contract",
    3: "Uploading Data on the Web2 Database",
    4: "Applying Access Conditions on your File",
    5: "Finished",
  };

  const handleMouseEnter = () => {
    sethoversub(true);
  };
  const handleMouseLeave = () => {
    sethoversub(false);
  };

  const [hoversub, sethoversub] = useState(false);

  //FLOW

  // 1. Validate Data
  // 2. Upload Encrypted File to IPFS
  // 3. Create Contract and Store Data in DB
  // 4. Apply Access condition

  //VALIDATE DATA

  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    try {
      const signedMessage = await signer.signMessage(messageRequested);
      return {
        signedMessage: signedMessage,
        publicKey: address,
      };
    } catch (error) {
      NotificationManager.error(
        "Denied Signature",
        "You denied to sign the message",
        3000
      );
    }
  };

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const handleLoader = (flowStage) => {
    const data = FLOW[flowStage];
    setLoadingData(data);
  };
  const uploadProjectImage = async () => {
    if (!projectImage) return;
    const storage = getStorage(app);
    const fileName = projectImage.name + new Date().getTime();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, projectImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      async () => {
        let projectImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        // This url will be stored in the web2 backend
        formData.projectImageUrl = projectImageUrl;
      }
    );
  };

  /* Deploy file along with encryption */

  const deployEncrypted = async (e) => {
    let { publicKey, signedMessage: uploadSignedMessage } =
      await encryptionSignature();
    handleLoader(1);
    const uploadResponse = await lighthouse.uploadEncrypted(
      projectFileEvent, //e
      publicKey,
      process.env.REACT_APP_LIGHTHOUSE_API_KEY,
      uploadSignedMessage,
      progressCallback
    );

    formData.fileCid = uploadResponse.data.Hash;
    formData.fileSize = uploadResponse.data.Size; //uploadResponse.data.Size/1000000; // converting fileSize to MB
    formData.fileName = uploadResponse.data.Name;
  };

  const deployAccessTokenContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let creators = [];
    let shares = [];
    let { projectName, tokenSymbol, totalTokenSupply, tokenPrice, fileCid } =
      formData;
    formData.creators.map((creator) => {
      creators.push(creator.creatorAddress);
      shares.push(creator.creatorShare);
    });

    let { _hex: currentProjectId } =
      await marketplaceContract.getCurrentProjectCounter();

    currentProjectId = parseInt(currentProjectId.toString());
    const projectCreationFee =
      await marketplaceContract.getProjectCreationFee();

    const tx = await marketplaceContract.createProject(
      projectName,
      tokenSymbol,
      totalTokenSupply,
      ethers.utils.parseEther(tokenPrice.toString()),
      creators,
      shares,
      fileCid,
      {
        value: ethers.utils.parseEther(
          (projectCreationFee / 10 ** 18).toString()
        ),
      } //projectCreationFee in ether
    );
    handleLoader(2);

    const receipt = await provider.waitForTransaction(tx.hash, 1, 150000);

    const projectDetails = await marketplaceContract.projectIdToDetails(
      currentProjectId
    );

    formData.tokenContractAddress = projectDetails[2];
    formData.projectId = currentProjectId;
  };

  const uploadDataOnDB = async () => {
    const res = await fetch(`${BASE_URL}/createProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  const applyAccessCondition = async () => {
    let { publicKey, signedMessage: accessSignedMessage } =
      await encryptionSignature();
    handleLoader(4);

    const conditions = [
      {
        id: 3141,
        chain: "Hyperspace",
        method: "balanceOf",
        standardContractType: "ERC20",
        contractAddress: formData.tokenContractAddress,
        returnValueTest: {
          comparator: ">=",
          value: "1",
        },
        parameters: [":userAddress"],
      },
    ];

    const aggregator = "([1])";

    const accessResponse = await lighthouse.accessCondition(
      publicKey,
      formData.fileCid,
      accessSignedMessage,
      conditions,
      aggregator
    );

    if (accessResponse.data.status === "Success") {
      setLoader(5);
    } else {
      //failed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      projectName,
      projectDescription,
      tokenSymbol,
      tokenPrice,
      totalTokenSupply,
      numberOfCreators,
      creators,
    } = formData;
    if (
      !projectName ||
      !projectDescription ||
      !tokenSymbol ||
      !tokenPrice ||
      !totalTokenSupply ||
      !numberOfCreators ||
      !creators
    )
      return NotificationManager.error(
        "Fill the required fields",
        "Fill the Form",
        2000
      );
    await uploadProjectImage(); //upload image to firebase
    await deployEncrypted(e); //

    await deployAccessTokenContract();
    handleLoader(3);
    await uploadDataOnDB();

    await applyAccessCondition();
    handleLoader(5);
    NotificationManager.success("Form Submitted!", "Successful!", 2000);
    navigate("/explore");
  };

  return (
    <>
      <button
        onClick={(e) => handleSubmit(e)}
        style={{
          color: hoversub ? "#658BD6" : "white",
          padding: "7px",
          background: "none",
          border: "none",
          fontFamily: "Montserrat, sans-serif",
          cursor: "pointer",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <b>SUBMIT</b>
      </button>
    </>
  );
}
export default UploadButton;
