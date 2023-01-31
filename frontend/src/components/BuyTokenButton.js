import React, { useContext } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import { MemoContext } from "../context/MemoContext";

export const BuyTokenButton = ({ projectData }) => {
  // const sampleProjectData = {
  //   projectId: 1,
  //   tokenPrice: "1000000000000000000",
  // };
  const { checkUser, loadContracts, marketplaceContract, provider, signer  } =useContext(MemoContext)
  let { projectId } = useParams();
  console.log(projectData);
  const handleBuyToken = async () => {

    const userType = await checkUser(projectData.projectId);
    if (userType===2) {
      const tx = await marketplaceContract.buyProjectToken(
        projectId,
        {
          value: ethers.utils.parseEther(projectData.tokenPrice.toString()), //in ethers
        }
      );

      console.log(tx)

      const receipt = await provider.waitForTransaction(tx.hash, 1, 150000);

      console.log(receipt)

      //check if transaction is successful logic

      window.location.reload();
    }
    else alert("You can't purchase this token")
  };

  return (
    <>
      <button onClick={handleBuyToken}>Purchase Token</button>
    </>
  );
};
