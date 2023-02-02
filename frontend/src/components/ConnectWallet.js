import React, { useContext} from "react";
import { MemoContext } from "../context/MemoContext";
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

        await accountChangeHandler(accounts[0]);

        // navigate("/getprotected", { state: { walletAddress: accounts[0] } });
      } catch (error) {
        console.log(error);
      }
    } else {
      //NOTIFICATIONS.SHOW("Need to install Metamask");
    }
  };

  const accountChangeHandler = async (userAddress) => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const userAddress = await signer.getAddress();
    setAccount(userAddress);
    console.log("Calling backend",userAddress);
    const res = await fetch("http://localhost:3001/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: userAddress }),
    });
    // setAccount(userAddress.slice(0, 6) + "..." + userAddress.slice(-4));
    // await getUserBalance(userAddress.toString());
    // updateEthers();
  };


  const refreshPage = () => {
    window.location.reload();
    window.localStorage.clear();
    //clear the address and all the user state
  };

  //reload page if chain or account is changed
  window.ethereum.on("accountsChanged", accountChangeHandler); // should we update account details if user connectes another account from metamask
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
        <span>
          {account
            ? account.slice(0, 6) + "..." + account.slice(-4)
            : "Connect Wallet"}
        </span>
      </button>
      {/* {userBalance && <div>Balance: {userBalance}</div>} */}

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
