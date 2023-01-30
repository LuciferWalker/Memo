import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import { ethers } from "ethers";

export const loadContracts = () => {
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner();

  let marketplaceContract = new ethers.Contract(
    MarketplaceAddress.address,
    MarketplaceAbi.abi,
    signer
  );

  return marketplaceContract;
};

export const checkUser = async (projectId) => {
  let userData = await fetch(
    `http://localhost:3001//getUserData/:${localStorage.getItem("account")}`
  );

  userData = await userData.json();
  return (
    projectId in userData.boughtProjects ||
    projectId in userData.createdProjects
  );
  //check if the user already owns the token
  //check if the user has craeted this project
};
