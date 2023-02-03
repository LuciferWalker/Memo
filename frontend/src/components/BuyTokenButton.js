import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { MemoContext } from "../context/MemoContext";
import { NotificationManager } from "react-notifications";
import { BASE_URL } from "../utils";

export const BuyTokenButton = ({ projectData,purchaseProcessing,setPurchaseProcessing }) => {
  const [hover, sethover] = useState(false);
  const handleMouseEnter = () => {
    sethover(true);
  };
  const handleMouseLeave = () => {
    sethover(false);
  };

  const { marketplaceContract, account, provider } = useContext(MemoContext);

  const handleBuyToken = async () => {
    try {
      const tx = await marketplaceContract.buyProjectToken(
        projectData.projectId,
        {
          value: ethers.utils.parseEther(projectData.tokenPrice.toString()), //in ethers
        }
        );
      setPurchaseProcessing(true)

      const receipt = await provider.waitForTransaction(tx.hash, 1, 150000);

      setPurchaseProcessing(false)
      const projectStatus = await marketplaceContract.getProjectStatus(
        projectData.projectId
      );

      if (!projectStatus) {
        const res = await fetch(
          `${BASE_URL}/updateProjectStatus/${projectData.projectId}`
        );
      }

      //check if transaction is successful logic

      const res = await fetch(`${BASE_URL}/projectTokenBought`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectData.projectId,
          address: account,
        }),
      });

      NotificationManager.success(
        "Token Bought!",
        "You can download the file now",
        2000
      );

      window.location.reload();
    } catch (error) {
      NotificationManager.error("Failed", error.data.message, 3000);
    }
  };

  return (
    <>
      <span
        style={{
          marginLeft: "30px",
          paddingRight: "10px",
          color: hover ? "#658BD6" : "white",
          cursor: "pointer",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleBuyToken}
      >
        PURCHASE
      </span>
    </>
  );
};
