import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConnectWallet = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [errorMessage, seterrorMessage] = useState(null);

  const connectWalletHandler = async () => {

    //check if metmask exists
    if (window.ethereum) {
      console.log("Detected Metamask");

      try {
        const accounts = await window.ethereum.request({
          //returns an array of accounts
          method: "eth_requestAccounts",
        });

        setWalletAddress(accounts[0]);
        navigate("/getprotected", { state: { walletAddress: accounts[0]} });
      } catch (error) {
        console.log(error);
      }
    } else {
        seterrorMessage("Did not detect Metamask");
    }
  };

  return (
    <>
      <button onClick={connectWalletHandler}>Connect Wallet</button>
      {/* <h3>{walletAddress}</h3> */}
    </>
  );
};

export default ConnectWallet;

// const checkWallet = async () => {
//   let temp = await tokenContract.balanceOf(walletAddress);
//   temp = ethers.utils.formatEther(temp);
//   console.log(temp);
// };
