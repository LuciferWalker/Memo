import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import MarketplaceAbi from "../contractsData/Marketplace.json";

const ConnectWallet = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(localStorage.getItem("account") || "Connect Wallet");
  // sessionStorage.getItem("account") ||
  const [userBalance, setUserBalance] = useState(null);

  // const [provider, setProvider] = useState(null);
  // const [signer, setSigner] = useState(null);
  const [marketplaceContract, setMarketplaceContract] = useState(null);

  useEffect(() => {
    localStorage.setItem("account", account);
  }, [account, marketplaceContract]);

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

        await accountChangeHandler(accounts[0]);

        // navigate("/getprotected", { state: { walletAddress: accounts[0] } });
      } catch (error) {
        console.log(error);
      }
    } else {
      //NOTIFICATIONS.SHOW("Need to install Metamask");
    }
  };

  const accountChangeHandler = async (newAccount) => {
    setAccount(newAccount);
    await getUserBalance(newAccount.toString());
    // updateEthers();
  };

  const getUserBalance = async (userAddress) => {
    const userBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [userAddress, "latest"],
    });
    let formatedUserBalance = ethers.utils.formatEther(userBalance);
    let approxUserBalance = formatedUserBalance.slice(
      0,
      formatedUserBalance.indexOf(".") + 4
    );

    setUserBalance(approxUserBalance);
  };

  const refreshPage = () => {
    window.location.reload();
    window.localStorage.clear();
  };

  //reload page if chain or account is changed
  // window.ethereum.on("accountsChanged", refreshPage);
  window.ethereum.on("chainChanged", refreshPage);

  // const updateEthers = () => {
  //   let provider = new ethers.providers.Web3Provider(window.ethereum);
  //   // setProvider(provider);

  //   let signer = provider.getsigner();
  //   localStorage.setItem("signer", signer);
  //   console.log(signer)

  //   let marketplaceContract = new ethers.Contract(
  //     MarketplaceAddress,
  //     MarketplaceAbi,
  //     signer
  //   );
  //   setMarketplaceContract(marketplaceContract);
  // };

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
        <span>{account==="Connect Wallet"? "Connect Wallet" : account.slice(0,6)+'...'+account.slice(-4)}</span>
      </button>
      {userBalance && <div>Balance: {userBalance}</div>}

      {/* <h3>{walletAddress}</h3> */}
    </>
  );
};

export default ConnectWallet;

// const checkWallet = async () => {
//   let temp = await tokenContract.balanceOf(walletAddress);
//   temp = ethers.utils.formatEther(temp);
//   console.log(temp);
// };
