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
      try {
        const accounts = await window.ethereum.request({
          //returns an array of accounts
          method: "eth_requestAccounts",
        });

        accountChangeHandler(accounts[0]);

        navigate("/getprotected", { state: { walletAddress: accounts[0] } });
      } catch (error) {
        console.log(error);
      }
    } else {
      seterrorMessage("Need to install Metamask");
    }
  };

  const accountChangeHandler = (newAccount) => {
    setWalletAddress(newAccount);
    updateEthers();
  };

  const updateEthers = () => {

    let tempProvider = new updateEthers.providers.web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);


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
