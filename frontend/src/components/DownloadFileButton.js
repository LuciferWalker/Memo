import React from "react";

export const DownloadFileButton = ({ projectData }) => {
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
    console.log(signedMessage);

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
    console.log(decrypted);

    const url = URL.createObjectURL(decrypted);
    console.log(url);
    setFileURL(url);
  };

  const handleDownloadFile = async () => {
    await decrypt();
  };

  return (
    <>
      <button onClick={handleDownloadFile}>Download</button>
    </>
  );
};

export default DownloadFileButton;

//   return (
//     <div className="App">
//       <button onClick={() => decrypt()}>decrypt</button>
//       {fileURL ? (
//         <a href={fileURL} target="_blank">
//           viewFile
//         </a>
//       ) : null}
//     </div>
//   );
