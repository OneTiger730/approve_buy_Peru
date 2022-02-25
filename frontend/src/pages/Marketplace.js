// import "../assets/css/templates/mmlogin.scss";
import Button from "components/atoms/Button";
import { useEffect, useState } from "react";
import "assets/css/templates/components/modal.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SocialMedia from "components/molecules/SocialMedia";
import eggNFT from "assets/img/huevo-gusano.png";
import Logo from "components/atoms/Logo";
import LoadingWorm from "components/organisms/LoadingWorm";
import alien from "assets/img/alien.png";
import soldierWorm from "assets/img/gusano-guerrero.png";
import { connectWallet, getCurrentWalletConnected } from "../util/interact.js";
import api from "../util/api.js";
import { BusdAbiService } from "util/services/busd.js";
import { FaSpinner } from "react-icons/fa";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

toast.configure()

const Web3 = require("web3");

const mainnetAbi = [{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_price","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"safeMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_max","type":"uint256"}],"name":"setMaxNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setNFTPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]


function MarketPlacePage() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [currentModal, setCurrentModal] = useState("init");
  // const [isBusdNotApproved, setBusdApproved] = useState(true);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [allowance, setAllowance] = useState(0)
  const [price, setPrice] = useState(1)
  const navigate = useNavigate();
  // we create an initial state for the current eggs available by user
  const [currentMintedNfts, setCurrentMintedNfts] = useState();
  const [wholeMintedNfts, setWholeMintedNfts] = useState(0);
  const [nftImgPath, setNftImgPath] = useState();

  const eggPrice = 100 * Number(price)
  const isBusdNotApproved = (Number(allowance) < (Number(price) * 10e17))
  // const isBusdNotApproved = true;
  // we inform the user about mm status on model info
  const [MMStatusInfo, setMMStatusInfo] = useState("Esperando a Metamask");

  // contract address
  // const mainnetContract = "0x4f54DBCF6852cc5386f72210B3587B1975637386";
  const mainnetContract = "0x2c59a530b0f253b4e436dea8c6d127465f5c0a55";

  const account1 = walletAddress;
  let tokenId;

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    // setStatus(status);
    addWalletListener();
  }, []);

  useEffect(() => {
    if (walletAddress) {
      calculateMintedEggs();
    }
  }, [walletAddress]);

  useEffect(() => {
    imgURI(wholeMintedNfts + 1);
  }, [wholeMintedNfts]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalOpen(false);
    }, 3000);
  }, []);

  useEffect(() => {
    (async () => {
      const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545";
      const web3 = new Web3(rpcURL);
      if (account1 && web3.eth.Contract) {
        const BUSDContractAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
        const BUSDABI = BusdAbiService;
    
        const BUSDContract = await new web3.eth.Contract(
          BUSDABI,
          BUSDContractAddress
        );
    
        // const myContract = await new web3.eth.Contract(mainnetAbi, mainnetContract);
        const allowance = await BUSDContract.methods
          .allowance(account1, mainnetContract)
          .call();
        setAllowance(allowance)
      }
    }) ()
  }, [account1])

  function imgURI(tokenId) {
    let base_URI = "https://negociosytecnologias.net/erc721/" + tokenId;
    try {
      api.get(base_URI).then(function (response) {
        var str = response.data;
        var str1 = str.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "");
        var arr = str1.split('"');
        var res = arr[arr.length - 2];

        setNftImgPath(res);
      });
    } catch (error) {
      console.log("Something went wrong: " + error.message);
    }
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          // setWallet(accounts[0]);
          // setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          // setWallet("");
          // setStatus("🦊 Connect to Metamask using the top right button.");

          localStorage.removeItem("uuid");
          navigate("/login");
        }
      });
    }
  }

  function calculateMintedEggs() {
    const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545";
    const web3 = new Web3(rpcURL);
    window.contract = new web3.eth.Contract(mainnetAbi, mainnetContract);
    window.contract.methods.tokenId().call((err, result) => {
      setWholeMintedNfts(parseInt(result));
    });
    window.contract.methods.balanceOf(walletAddress).call((err, result) => {
      console.log(parseInt(result))
      setCurrentMintedNfts(parseInt(result));
    });
  }

  function getCountOfNFTs() {
    const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545";
    const web3 = new Web3(rpcURL);
    window.contract = new web3.eth.Contract(mainnetAbi, mainnetContract);
    window.contract.methods.tokenId().call((err, result) => {
      setWholeMintedNfts(parseInt(result));
    });
    window.contract.methods.balanceOf(walletAddress).call((err, result) => {
      console.log(parseInt(result))
    });
  }

  //mintNFT
  const mint_NFT = async (values) => {
    const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545";
    const web3 = new Web3(rpcURL);

    const BUSDContractAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
    const BUSDABI = BusdAbiService;

    const BUSDContract = await new web3.eth.Contract(
      BUSDABI,
      BUSDContractAddress
    );

    // const myContract = await new web3.eth.Contract(mainnetAbi, mainnetContract);

    const busdBalance = await BUSDContract.methods
      .balanceOf(account1)
      .call();

    // set loading modal while order process is on
    console.log('loading screen')
    setCurrentModal("loading-screen");
    setModalOpen(true)
    setLoading(true)
    const mainnetContractInterface = await new web3.eth.Contract(mainnetAbi, mainnetContract);

    const transactionParameters = {
      to: mainnetContract,
      from: account1,
      data: mainnetContractInterface.methods.safeMint(web3.utils.toHex(price * 10e17)).encodeABI(),
    };
    setMMStatusInfo("Esperando a Metamask");

    if (values.length > 0) {
      try {
        for (var i = 1; i <= values; i++) {
          // const txHash = await window.ethereum.request({
          //   method: "eth_sendTransaction",
          //   params: [transactionParameters],
          // });
          const transfer = () => {
            return window.ethereum.request({
              method: "eth_sendTransaction",
              params: [transactionParameters],
            });
          }
          transfer()
          .then(tx => {
            setLoading(true)
            console.log("transaction done, ", tx);
            const intervalHandler = setInterval(async () => {
              const nftBalance = await mainnetContractInterface.methods
              .balanceOf(account1)
              .call();
              if (nftBalance > currentMintedNfts) {
                calculateMintedEggs()
                api
                .post("/registerNFT", {
                  params: { address: account1, id: currentMintedNfts + 1  },
                })
                .then(function (response) {})
                .catch(function (error) {
                  console.log("stories error response :: ", error);
                });
                toast.success(
                  `Ha comprado con exito ${currentMintedNfts + 1} NFTs. Bienvenido a la aventura`,
                  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
                setCurrentModal("buy-egg");
                setModalOpen(false)
                setLoading(false)
                clearInterval(intervalHandler)
              }
            }, 2000)
          })
          .catch(() => {
            setLoading(false)
            setModalOpen(false);
            toast.warn(
              "Error en la compra. Error en la red",
              {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          })
        }
      } catch (error) {
        alert('here')
        setModalOpen(false);
        setLoading(false)
        toast.warn(
          "Error en la compra. Error en la red",
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
  };

  async function registerNFT(address, id) {
    await api
      .post("/registerNFT", { params: { address: address, id: id } })
      .then(function (response) {
        return response.data.Success;
      })
      .catch(function (error) {
        console.log("stories error response :: ", error);
      });
  }

  // handler to open ShowBuyEgg
  const handleBuyEgg = () => {
    console.log('set buy egg')
    setCurrentModal("buy-egg");
    setModalOpen(true);
  };

  // form component
  const BuyEggForm = ({ onMintNFT }) => {
    const [proStatus, setProStatus] = useState(0);
    const {
      handleSubmit,
      register,
      watch,
      formState: { errors },
    } = useForm({
      defaultValues: {
        nftquantity: "1",
      },
    });
    const onSubmit = (values) => {
      if(currentMintedNfts >= 10){
        toast.warn(
          "mint count error",
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        // alert('Minted Count');
        return;
      };
      if(Number(allowance) > (Number(price) * 10e17)){
        toast.warn(
          "Error en la compra. Insuficiente credito",
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }
      
      console.log(values.nftquantity);
      // console.log(formState);
      onMintNFT(values.nftquantity);
    };
    // const onInputChange = (event) => {
    //   console.log(event.target.value);
    //   setInputValue(event.target.value);
    // };
    // const inputValue = watch(["nftquantity", "number"]);
    const handleChange = (event) => {
      // document.getElementById("totalPrice").innerHTML =
      //   eggPrice * event.target.value + " BUSD";
      if (Number(event.target.value) < 1)
        setPrice(Number(event.target.value))
    };

    // handler when click Approve
    const approveBUSDHandler = async () => {
      try {
        setModalOpen(true)
        setCurrentModal('loading-screen')
        const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545";
        const web3 = new Web3(rpcURL);
        // important, this busd address is probably wrong
        const BUSDContractAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
        const BUSDABI = BusdAbiService;

        const BUSDContract = await new web3.eth.Contract(
          BUSDABI,
          BUSDContractAddress
        );

        // const myContract = await new web3.eth.Contract(mainnetAbi, mainnetContract);

        const transactionParameters = {
          to: BUSDContractAddress,
          from: account1,
        };
        const busdBalance = await BUSDContract.methods
          .balanceOf(account1)
          .call();

          if (Number(busdBalance) < price * 10e17) {
            setModalOpen(false)
            setLoading(false)
            return toast.warn(
              "La aprobacion no se pudo realizar. Insuficiente credito",
              {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }
        const allowance = await BUSDContract.methods
          .allowance(account1, mainnetContract)
          .call();
        
        if (Number(allowance) < (price * 10e17) ) {
          setLoading('true');
          transactionParameters.data = await BUSDContract.methods
            .approve(mainnetContract, web3.utils.toHex(Number(price) * 10e17))
            .encodeABI();
            const txHash = await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [transactionParameters],
            })
            .catch(() => {
              setLoading(false)
              setModalOpen(false)
            })
            const intervalHandler = setInterval(async () => {
              const allowance = await BUSDContract.methods
              .allowance(account1, mainnetContract)
              .call();
              if (Number(allowance) >= (price * 10e17) ) {
                setAllowance(Number(allowance))
                toast.success(
                  "Aprobacion realizada con exito. Ya puede comprar nfts",
                  {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
                setModalOpen(false)
                setLoading(false)
                clearInterval(intervalHandler)
              }
            }, 2000)
            console.log("end");
        } else {
          console.log('here')
        }
    } catch (err) {
      setModalOpen(false)
      setLoading(false)
      toast.warn(
        "La aprobracion no se pudo realizar. Error en la red",
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }
  return (
      <>  
        <form className="buy-egg-form mt-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="buy-egg-form-label flex-wrapper">
            <div>Costo de huevo</div>
            <div>{eggPrice} BUSD</div>
          </div>
          <div className="buy-egg-form-quantity flex-wrapper">
            <div>Cantidad</div>
            <div>
              <input
                type="number"
                className="number-input"
                min="1"
                max="1"
                value={price}
                {...register("nftquantity")}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="buy-egg-form-label flex-wrapper">
            <div>Precio total</div>
            <div id="totalPrice">100 BUSD</div>
          </div>
          <div className="buy-egg-form-terms">
            * máximo de compra por wallet (2)
          </div>
          <div className="buy-egg-form-actions flex-wrapper mt-1">
            <button
              className="button create-acc-button"
              disabled={isBusdNotApproved || loading}
              onClick = {() => {
                // console.log(currentMintedNfts);
                if(currentMintedNfts >= 10){
                  setProStatus(1);
                }
              }}
            >{ loading ? (
              <img src="/ZZ5H.gif" style={{width: "20px", display: loading? "" : "none"}} />
            ) : (
              'Comprar'
            )}
              
            </button>
          </div>
        </form>

        <div className="absolute mintegg-cancel-button">
          <button
            className="button cancel create-acc-button"
            onClick={() => setModalOpen(false)}
          >
            cancelar
          </button>
          <button
            className="button create-acc-button create-acc-button d-flex"
            onClick={approveBUSDHandler}
            disabled={!isBusdNotApproved || loading}
          >
            { loading ? (
              <img src="/ZZ5H.gif" style={{width: "20px", display: loading? "" : "none"}} />
            ) : (
              <p>aprobar busd</p>
            )}
          </button>
        </div>
      </>
    );
  
  };

  // the Modal
  const ShowBuyEgg = () => {
    return (
      <>
        <div className="modal-wrapper">
          <div className="grid place-center">
            {/* {/ {2}/}
            {/ form starts /} */}
            {currentModal === "buy-egg" ? (
              <>
                <div className="create-account-modal">
                  <h1>Compra</h1>
                  <p className="my-1">
                    Estas a punto de comprar un huevo en Space Worms
                  </p>
                  <BuyEggForm
                    onCancel={() => {
                      setModalOpen(false);
                    }}
                    onMintNFT={(values) => {
                      mint_NFT(values);
                    }}
                    currentMintedNfts={currentMintedNfts}
                  />
                </div>
              </>
            ) : currentModal === "loading-screen" ? (
              <>
                <div className="loading-screen-container">
                  <h1>{MMStatusInfo}</h1>
                  <div>
                    <LoadingWorm />
                  </div>
                </div>
              </>
            ) : currentModal === "init" ? (
              <>
                {() => {
                  setModalOpen(false);
                }}
                <div className="flex-wrapper">
                  <div>
                    <LoadingWorm />
                  </div>
                  <h1>Cargando...</h1>
                </div>
              </>
            ) : (
              <>
                {() => {
                  setModalOpen(false);
                }}
                <div className="absolute img-loading">
                  <img src={soldierWorm} alt="" />
                </div>
                <div className="flex-wrapper">
                  <img src={alien} alt="" />
                  <h1>Bienvenido a la aventura</h1>
                </div>
              </>
            )}
            {/* {/ {2}/} */}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {modalOpen ? <ShowBuyEgg /> : ""}

      <div className="vh-100 mm-mint grid">
        <div className="">
          <h1 className="mmtitle">Egg Worms</h1>
          <div>
            <div className="NFT-status-container">
              <div className="NFT-status-box">
                <div>Cantidad Disponible</div>
                <div>{1000 - wholeMintedNfts} / 1000</div>
              </div>
              <div className="NFT-status-box">
                <div>Tiempo disponible</div>
                <div>2 días / 48Hrs</div>
              </div>
              {/* <div className="NFT-status-box">
                <div>Egg comprados</div>
                <div>{currentMintedNfts}</div>
              </div> */}
              <div className="NFT-status-box">
                <div>Eggs minted</div>
                {/* {
                  / on the first boolean, first string should display the current number of eggs bought, it will always be > 0 so... yeah. setting on first string a number just for visualizing the useState. /
                }
                {
                  / two booleans inserted probably first one wouldn't be needed once backend and MM actually works here /
                } */}
                <div>{currentMintedNfts} </div>
              </div>
            </div>
            <div className="NFT-view-container">
              <div className="image-container">
                <img src={nftImgPath} alt="" />
              </div>
              <div className="NFT-view-info-price">
                <div className="NFT-view-info-name">Minteo NFT</div>
                <div>100 BUSD</div>
              </div>
              <div className="NFT-view-info-stats">
                <div className="NFT-rare">Raro 5%</div>
                <div className="NFT-common">Común 12%</div>
                <div className="NFT-legendary">Legendario 8%</div>
                <div className="NFT-uncommon">Poco común 3%</div>
              </div>
              <div className="mt-1">
                {/* {currentMintedNfts >= 10 ? (
                  " "
                ) : (
                  <button onClick={handleBuyEgg} className="button">
                    Comprar
                  </button>
                )} */}
                <button onClick={handleBuyEgg} className="button">
                    Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SocialMedia />
        </div>
      </div>
    </>
  );
}

export default MarketPlacePage;
