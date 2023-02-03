import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import MarketplaceAbi from '../contractsData/Marketplace.json'

export const MemoContext = React.createContext()

export const MemoProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [marketplaceContract, setMarketplaceContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const checkUser = async (projectId) => {
    if (!account) return;
    let res = await fetch(`http://localhost:3001/getUserData/${account}`);
    let userData = await res.json();
    console.log(userData);

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

    
    // getUserBalance(account);
  };

  
  // const getUserBalance = async (userAddress) => {
  //   const userBalance = await window.ethereum.request({
  //     method: "eth_getBalance",
  //     params: [userAddress, "latest"],
  //   });
  //   let formatedUserBalance = ethers.utils.formatEther(userBalance);
  //   let approxUserBalance = formatedUserBalance.slice(
  //     0,
  //     formatedUserBalance.indexOf(".") + 4
  //   );

  //   setUserBalance(approxUserBalance);
  // };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };
  const setAcc = async ()=>setAccount(await signer.getAddress());
  useEffect(() => {
    loadContracts();
    checkIfWalletIsConnected()
  }, [account]);

  useEffect(()=>{
    setAcc()
  },)

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
