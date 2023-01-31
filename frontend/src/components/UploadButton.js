import React, { useEffect, useState , useContext} from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import { marketplaceContract, getUserWalletDetails } from "../utils";
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

function UploadButton({ formData, projectImage, projectFileEvent }) {
  const navigate = useNavigate();

    const { checkUser, marketplaceContract, account, provider } =
      useContext(MemoContext);
  const [loader, setLoader] = useState(null);
  const FLOW = {
    1: "Encrypting and Uplaoding File to IPFS",
    2: "Deploying a New Access Token Contract",
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
    const { isWalletConnected, provider, signer, userAddress } =
      getUserWalletDetails();

    if (isWalletConnected == false) {
      //NOTIFICATION>SHOW("CONNECT YOUR WALLET FIRST")
    }
    console.log(userAddress);
    const messageRequested = (await lighthouse.getAuthMessage(userAddress)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: userAddress,
    };
  };

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const checkCreatorData = () => {
    //check the data they have entered or add validation in the form itself
  };

  const handleLoader = (flowStage) => {
    console.log(FLOW[flowStage]);
  };
  const uploadProjectImage = async () => {
    if (!projectImage) return alert("First select an Image");
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
        console.log(projectImageUrl);
        // This url will be stored in the web2 backend
        formData.projectImageUrl = projectImageUrl;
      }
    );
  };

  // const loadContracts = () => {
  //   let provider = new ethers.providers.Web3Provider(window.ethereum);
  //   setProvider(provider);
  //   let signer = provider.getSigner();

  //   let marketplaceContract = new ethers.Contract(
  //     MarketplaceAddress.address,
  //     MarketplaceAbi.abi,
  //     signer
  //   );
  //   setMarketplaceContract(marketplaceContract);
  //   return marketplaceContract;
  // };

  /* Deploy file along with encryption */
  const deployEncrypted = async (e) => {
    let { publicKey, signedMessage: uploadSignedMessage } =
      await encryptionSignature();
    const uploadResponse = await lighthouse.uploadEncrypted(
      projectFileEvent, //e
      publicKey,
      "65e32863-69bb-4acc-bba8-08c461d19234", //process.env.REACT_APP_LIGHTHOUSE_API_KEY
      uploadSignedMessage,
      progressCallback
    );
    console.log(uploadResponse);

    formData.fileCid = uploadResponse.data.Hash;
    formData.fileSize = uploadResponse.data.Size/1000000; // converting fileSize to MB
    formData.fileName = uploadResponse.data.Name;
  };

  const deployAccessTokenContract = async () => {
    let { provider } = getUserWalletDetails();
    let creators = [];
    let shares = [];
    let { projectName, tokenSymbol, totalTokenSupply, tokenPrice, fileCid } =
      formData;
    formData.creators.map((creator) => {
      creators.push(creator.creatorAddress);
      shares.push(creator.creatorShare);
    });
    console.log(
      projectName,
      tokenSymbol,
      totalTokenSupply,
      tokenPrice,
      fileCid
    );
    console.log(creators);
    console.log(shares);

    let { _hex: currentProjectId } =
      await marketplaceContract.getCurrentProjectCounter();
    console.log(currentProjectId);
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
      { value: ethers.utils.parseEther("0.2") } //projectCreationFee in ether
    );

    console.log(tx);

    const receipt = await provider.waitForTransaction(tx.hash, 1, 150000);

    console.log(receipt);

    const projectDetails = await marketplaceContract.projectIdToDetails(
      currentProjectId
    );

    formData.tokenContractAddress = projectDetails[2];
    formData.projectId = currentProjectId;
  };

  const uploadDataOnDB = async () => {
    const res = await fetch("http://localhost:3001/createProject", {
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

    //dont know if encryptionSignature needs to be done again

    const accessResponse = await lighthouse.accessCondition(
      publicKey,
      formData.fileCid,
      accessSignedMessage,
      conditions,
      aggregator
    );

    console.log(accessResponse);

    if (accessResponse.data.status === "Success") {
      setLoader(5);
    } else {
      //failed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await uploadProjectImage(); //upload image to firebase
    handleLoader(1);
    await deployEncrypted(e); //
    handleLoader(2);
    await deployAccessTokenContract();
    handleLoader(3);
    await uploadDataOnDB();
    handleLoader(4);
    await applyAccessCondition();
    handleLoader(5);
    NotificationManager.success("Form Submitted!", "Successful!", 2000);
    navigate('explore');
    // navigate("/display", {
    //   state: {
    //     title: projectName,
    //     desc: projectDescription,
    //     price: price,
    //     creators: distribution,
    //     royal: royalDist,
    //   },
    // });
    // NotificationManager.success("Form Submitted!", "Successful!", 2000);
  };

  const verifyData = () => {};

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
