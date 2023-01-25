import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import MarketplaceAbi from '../contractsData/Marketplace.json'
//import contract address, abi from contractsData

const ConnectWallet = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [marketplaceContract, setMarketplaceContract] = useState({});
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

        loadContracts(signer);

        // navigate("/getprotected", { state: { walletAddress: accounts[0] } });
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
  };

  const loadContracts = async(signer) =>{
    let marketplaceContract = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplaceContract(marketplaceContract);
    setLoading(false);
  }

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
