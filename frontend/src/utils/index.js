import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import { ethers } from "ethers";

let provider, signer, isWalletConnected;
export let marketplaceContract,userAddress;

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


