import React from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

function AccessControl() {
  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const applyAccessConditions = async (e) => {
    const cid = "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh";

    // Conditions to add
    const conditions = [
      {
        id: 1,
        chain: "Hyperspace",
        method: "balanceOf",
        standardContractType: "ERC20",
        returnValueTest: {
          comparator: "=",
          value: "1",
        },
      },
    ];

    const aggregator = "([1])";
    const { publicKey, signedMessage } = await encryptionSignature();

    /*
      accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
        Parameters:
          publicKey: owners public key
          CID: CID of file to decrypt
          signedMessage: message signed by owner of publicKey
          conditions: should be in format like above
          aggregator: aggregator to apply on conditions
    */
    const response = await lighthouse.accessCondition(
      publicKey,
      cid,
      signedMessage,
      conditions,
      aggregator
    );

    console.log(response);
    /*
      {
        data: {
          cid: "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh",
          status: "Success"
        }
      }
    */
  };

  return (
    <>
      <button
        onClick={() => {
          applyAccessConditions();
        }}
      >
        Apply Access Consitions
      </button>
    </>
  );
}

export default AccessControl;
