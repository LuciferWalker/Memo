import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import { ethers } from "ethers";

let provider, signer, userAddress, isWalletConnected;
export let marketplaceContract;

export const updateAccount = async () => {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  userAddress = await signer.getAddress();

  return { isWalletConnected:true,provider, signer, userAddress };
};

export const getUserWalletDetails = () => {
  provider ? (isWalletConnected = true) : (isWalletConnected = false);
  return {
    isWalletConnected,
    provider,
    signer,
    userAddress,
  };  
};

export const getContracts = ()=>{
  return marketplaceContract;
}

export const loadContracts = () => {
  // let provider = new ethers.providers.Web3Provider(window.ethereum);
  // let signer = provider.getSigner();

  marketplaceContract = new ethers.Contract(
    MarketplaceAddress.address,
    MarketplaceAbi.abi,
    signer
  );

  return marketplaceContract;
};

export const checkUser = async (projectId) => {
  let userData = await fetch(
    `http://localhost:3001//getUserData/:${userAddress}`
  );

  userData = await userData.json();
  return (
    projectId in userData.boughtProjects ||
    projectId in userData.createdProjects
  );
  //check if the user already owns the token
  //check if the user has craeted this project
};
