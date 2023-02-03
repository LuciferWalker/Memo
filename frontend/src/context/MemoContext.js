import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import { NotificationManager } from "react-notifications";

export const MemoContext = React.createContext();

export const MemoProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [marketplaceContract, setMarketplaceContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const checkUser = async (projectId) => {
    if (!account) return;
    let res = await fetch(`http://localhost:3001/getUserData/${account}`);
    let userData = await res.json();

    if (userData.boughtProjects.includes(projectId))
      return 0; // user has bought
    else if (userData.createdProjects.includes(projectId))
      return 1; // user has created
    else return 2; // user can buy

    //check if the user already owns the token
    //check if the user has craeted this project
  };

  const loadContracts = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();

    let contract = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );

    setMarketplaceContract(contract);
    setSigner(signer);
    setProvider(provider);

    setAccount(await signer.getAddress());
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        NotificationManager.error(
          "No Accounts Found",
          "Connect a wallet",
          2000
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };
  const setAcc = async () => setAccount(await signer.getAddress());
  useEffect(() => {
    loadContracts();
    checkIfWalletIsConnected();
  }, [account]);

  useEffect(() => {
    setAcc();
  });

  return (
    <MemoContext.Provider
      value={{
        account,
        setAccount,
        checkUser,
        marketplaceContract,
        provider,
        signer,
      }}
    >
      {children}
    </MemoContext.Provider>
  );
};
