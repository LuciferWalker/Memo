import React from "react";
import { checkUser } from "../utils";

export const BuyTokenButton = ({ projectData }) => {
  const loadContracts = () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();

    let marketplaceContract = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );

    return marketplaceContract;
  };

  const handleBuyToken = async () => {
    const validation = await checkUser(projectData.projectId);

    if (!validation) {
      let marketplaceContract = loadContracts();

      const tx = await marketplaceContract.buyProjectToken(
        projectData.projectId,
        {
          value: ethers.utils.parseEther(projectData.tokenPrice.toString()), //in ethers
        }
      );

      const receipt = await provider.waitForTransaction(tx.hash, 1, 150000);

      //check if transaction is successful logic

      window.location.reload();
    }
  };

  return (
    <>
      <button onClick={handleBuyToken}>Purchase Token</button>
    </>
  );
};
