import React, { useState } from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

const DownloadFileButton = ({ projectData }) => {
  const [hover, sethover] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const handleMouseEnter = () => {
    sethover(true);
  };
  const handleMouseLeave = () => {
    sethover(false);
  };
  const sign_auth_message = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return { publicKey: publicKey, signedMessage: signedMessage };
  };
  /* Decrypt file */
  const decrypt = async () => {
    // Fetch file encryption key
    const cid = projectData.fileCid; //replace with your IPFS CID
    const { publicKey, signedMessage } = await sign_auth_message();

    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    const fileType = "application/zip";
    const decrypted = await lighthouse.decryptFile(
      cid,
      keyObject.data.key,
      fileType
    );

    const url = URL.createObjectURL(decrypted);
    window.open(url, "_blank");
    setFileUrl(url);
  };

  const handleDownloadFile = async () => {
    await decrypt();
  };

  return (
    <>
      <span
        style={{
          marginLeft: "30px",
          paddingRight: "10px",
          color: hover ? "#658BD6" : "white",
          cursor: "pointer",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleDownloadFile}
      >
        DOWNLOAD
      </span>
    </>
  );
};

export default DownloadFileButton;
