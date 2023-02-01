import React, {useContext, useState } from "react";
import { ethers } from "ethers";
import { MemoContext } from "../context/MemoContext";
import { NotificationManager } from "react-notifications";

export const BuyTokenButton = ({ projectData }) => {
  const [hover, sethover] = useState(false);
  const handleMouseEnter = () => {
    sethover(true);
  };
  const handleMouseLeave = () => {
    sethover(false);
  };

  // const sampleProjectData = {
  //   projectId: 1,
  //   tokenPrice: "1000000000000000000",
  // };
  const { checkUser, marketplaceContract, account, provider } =
    useContext(MemoContext);

  const handleBuyToken = async () => {
    console.log(projectData);
    console.log(projectData.projectId);

    try {
      const userType = await checkUser(projectData.projectId);
      console.log(userType);
      if (userType === 2) {
        const tx = await marketplaceContract.buyProjectToken(
          projectData.projectId,
          {
            value: ethers.utils.parseEther(projectData.tokenPrice.toString()), //in ethers
          }
        );

        console.log(tx);

        const receipt = await provider.waitForTransaction(tx.hash, 1, 150000);

        console.log(receipt);

        //check if transaction is successful logic

        const res = await fetch("http://localhost:3001/projectTokenBought", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: projectData.projectId,
            address: account,
          }),
        });

        window.location.reload();
      } else {
        NotificationManager.error(
          "You can't purchase this token",
          "Failed!",
          2000
        );
      }
    } catch (error) {
      //NOTIFICATION.SHOW(Error)
      NotificationManager.error(error.data.message, "Failed!", 2000);
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
