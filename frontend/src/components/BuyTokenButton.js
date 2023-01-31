import React from "react";
import { checkUser, loadContracts } from "../utils";
import { ethers } from "ethers";

export const BuyTokenButton = ({ projectData }) => {
  const sampleProjectData = {
    projectId: 1,
    tokenPrice: "1000000000000000000",
  };

  const handleBuyToken = async () => {
    // const validation = await checkUser(sampleProjectData.projectId);

    // if (!validation) {
      let { marketplaceContract, provider, signer } = loadContracts();

      const tx = await marketplaceContract.buyProjectToken(
        projectData.projectId,
        {
          value: ethers.utils.parseEther(
            (projectData.tokenPrice / 10 ** 18).toString()
          ), //in ethers
        }
      );

      console.log(tx)

      const receipt = await provider.waitForTransaction(tx.hash, 1, 150000);

      console.log(receipt)

      //check if transaction is successful logic

      window.location.reload();
    // }
  };

  return (
    <>
      <button onClick={handleBuyToken}>Purchase Token</button>
    </>
  );
};
