// import React from "react";
// import { ethers } from "ethers";
// import lighthouse from "@lighthouse-web3/sdk";

// function UploadButton() {

//   const [loader, setLoader] = useState(null);
//   //FLOW

//   // 1. Validate Data
//   // 2. Upload Encrypted File to IPFS
//   // 3. Create Contract and Store Data in DB
//   // 4. Apply Access condition

//   const encryptionSignature = async () => {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     const messageRequested = (await lighthouse.getAuthMessage(address)).data
//       .message;
//     const signedMessage = await signer.signMessage(messageRequested);
//     return {
//       signedMessage: signedMessage,
//       publicKey: address,
//     };
//   };

//   const progressCallback = (progressData) => {
//     let percentageDone =
//       100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
//     console.log(percentageDone);
//   };

//   /* Deploy file along with encryption */
//   const deployEncrypted = async (e) => {

//     const sig = await encryptionSignature();
//     const uploadResponse = await lighthouse.uploadEncrypted(
//       e,
//       sig.publicKey,
//       process.env.REACT_APP_LIGHTHOUSE_API_KEY, //process.e
//       sig.signedMessage,
//       progressCallback
//     );
//     console.log(uploadResponse);

//     const cid = uploadResponse.Hash;
//     const fileSize = uploadResponse.Size;
//     const fileName = uploadResponse.Name;

//     //upload the accessToken contract for this project

//     uploadAccessContract(contractUploadData);
//     uploadDataOnDB(projectData);

//     //const contractAddress = await marketplace.createProject(name,
//     //symbol,
//     // maxSupply,
//     // tokenPrice,
//     // creators,
//     // shares)

//     const conditions = [
//       {
//         id: 3141,
//         chain: "Hyperspace",
//         method: "balanceOf",
//         standardContractType: "ERC20",
//         contractAddress: contractAddress,
//         returnValueTest: {
//           comparator: ">=",
//           value: "1",
//         },
//         parameters: [":userAddress"],
//       },
//     ];

//     const aggregator = "([1])";

//     //dont know if encryptionSignature needs to be done again

//     const accessResponse = await lighthouse.accessCondition(
//       publicKey,
//       cid,
//       signedMessage,
//       conditions,
//       aggregator
//     );

//     console.log(accessResponse);

//     if (accessResponse.data.status === "Success") {
//       // access condition applied successfully
//     } else {
//       //failed
//     }
//   };

//   const uploadAccessContract = (contractUploadData) => {

//   };

//   const uploadDataOnDB = (projectData) =>{
//     const res = fetch('http://localhost:3001/createProject',{
//       method: 'POST',
//       body: JSON.stringify(projectData)
//     })
//   }

//   const checkCreatorData = () => {
//     //check the data they have entered or add validation in the form itself
//   };

//   return (
//     <>
//       <button
//         onSubmit={(e) => deployEncrypted(e)}
//         type="submit"
//         style={{
//           color: hoversub ? "#658BD6" : "white",
//           padding: "7px",
//           background: "none",
//           border: "none",
//           fontFamily: "Montserrat, sans-serif",
//           cursor: "pointer",
//         }}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <b>SUBMIT</b>
//       </button>
//     </>
//   );
// }
// export default UploadButton;
