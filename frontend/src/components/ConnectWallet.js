import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
//import contract address, abi from contractsData

const ConnectWallet = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [provider, setProvider] = useState(null);

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
      setErrorMessage("Need to install Metamask");
    }
  };

  const accountChangeHandler = (newAccount) => {
    setAccount(newAccount);
    updateEthers();
  };

  const updateEthers = () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    let signer = provider.getsigner();
    setSigner(signer);

    let tempContract = new updateEthers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    setContract(tempContract);
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
