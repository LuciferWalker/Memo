import React, { useContext } from "react";
import { MemoContext } from "../context/MemoContext";

import { NotificationManager } from "react-notifications";
import { BASE_URL } from "../utils";
const ConnectWallet = () => {
  const { account, setAccount } = useContext(MemoContext);

  // const networks = {
  //   hyperspace: {
  //     chainId: `0x${Number(3141)}`,
  //     chainName: "Hyperspace testnet",
  //     nativeCurrency: {
  //       name: "",
  //       symbol: "",
  //       decimals: 18
  //     },
  //     rpcUrls: [""],
  //     blockExplorerUrls: [""]
  //   }
  // }

  const connectWalletHandler = async () => {
    //check if metmask exists
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          //returns an array of accounts
          method: "eth_requestAccounts",
        });

        await accountChangeHandler(accounts);
      } catch (error) {
        console.log(error);
      }
    } else {
      NotificationManager.error("Need to install Metamask", "Failed!", 2000);
    }
  };

  const accountChangeHandler = async (accounts) => {
    setAccount(accounts[0]);
    const res = await fetch(`${BASE_URL}/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: accounts[0] }),
    });
  };

  const refreshPage = () => {
    window.location.reload();
    window.localStorage.clear();
    //clear the address and all the user state
  };

  //reload page if chain or account is changed
  // window.ethereum.on("accountsChanged", accountChangeHandler); // should we update account details if user connectes another account from metamask
  window.ethereum.on("chainChanged", refreshPage);

  return (
    <>
      <button
        onClick={connectWalletHandler}
        style={{
          width: "100%",
          height: "35px",
          fontSize: "15px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img
          src="https://chainlist.org/connectors/icn-metamask.svg"
          alt=""
          width="20"
          height="20"
        />
        <span>
          {account
            ? account.slice(0, 6) + "..." + account.slice(-4)
            : "Connect Wallet"}
        </span>
      </button>
    </>
  );
};

export default ConnectWallet;
