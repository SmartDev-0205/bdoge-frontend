import logo from './logo.png';
import ABI from "./ABI.json";
import Web3 from 'web3';
// import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import './App.css';
import "@fontsource/space-grotesk";

import React, { useEffect, useState } from 'react';

const contractAddress = "0x7C52e0a5C9AA090d31e63Ec12c952D9a856548Ae";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  // const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('Connect Wallet');
  const [isConnected, setIsConnected] = useState(false);
  const [apv_token, setApvToken] = useState("0");
  const { ethereum } = window;
  const web3 = new Web3(window.ethereum);
  const airdropContract = new web3.eth.Contract(ABI, contractAddress);
  const [open, setOpen] = useState(false);

  const clearAccount = () => {
    console.log("ethereum", window.ethereum.selectedAddress);
    if (!window.ethereum.selectedAddress)
      setIsConnected(false)
  }

  useEffect(() => {
    console.log("metamask event changed")
    const { ethereum } = window;
    if (ethereum) {
      ethereum.on('disconnect', () => { console.log("disconnected ------------") });
      connectWallet();
    }
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        // sethaveMetamask(false);
      }
      // sethaveMetamask(true);
    };
    checkMetamaskAvailability();

    // ethereum.off('disconnect', clearAccount);
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        // sethaveMetamask(false);
      }
      ethereum.on('accountsChanged', clearAccount);
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccountAddress(accounts[0]);
      setIsConnected(true);
    }
    catch (error) {
      setIsConnected(false);
    }
  }

  const claimAirdrop = async () => {

    let param = apv_token + "000000000000000000";
    console.log(accountAddress);
    let tx = airdropContract.methods.airdrop(param).send({ from: accountAddress })
      .then((receipt) => {
        console.log(receipt);
      })
      .catch((error) => {
        console.log(error)
        setOpen(true)
      });
    await tx;

  }

  return (
    <div className=" text-center bg-[url('background.jpg')]  content-center flex flex-col bg-no-repeat bg-cover bg-center h-screen w-screen overflow-x-hidden overflow-y-auto" >
      <div className="flex flex-row w-screen justify-between sticky top-0 left-0 px-4 sm:px-12 py-4 backdrop-blur-md">
        <div className='flex flex-row items-center justify-items-center font-bold'>
          <img src={logo} className="w-8 h-8 sm:w-10 sm:h-10" alt="logo" />
          <p className="text-xl sm:text-2xl text-yellow-200 "><span className='text-white'>BNB</span>DOGE</p>
        </div>
        <button className='rounded-md bg-yellow-200 text-black text-md px-3 py-1 sm:px-5 sm:py-2 font-bold' onClick={connectWallet}>
          {isConnected ?
            accountAddress.substring(0, 4) + "..." + accountAddress.slice(-4)
            : "connect Wallet"
          }
        </button>
      </div>
      <div>
        <p className='text-yellow-400 text-xl sm:text-2xl font-bold mt-32 sm:mt-24 '>
          Proudly Launch on Binance Chain
        </p>
        <p className='text-2xl sm:text-4xl  text-white font-bold mt-12'>Co-Built By AI Creatures And Our Community</p>
      </div>
      <div className='rounded-xl backdrop-blur-sm border-2 mx-5 sm:w-1/2 md:w-2/5 self-center py-8 px-10 flex flex-col gap-y-6 my-24 sm:my-42 gradient-box border-yellow-200'>
        <p className='text-xl sm:text-3xl font-black bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent'>
          You Can Claim BDOGE Now!
        </p>
        <p className='text-gray-300 font-bold text-xl'>
          A total of 210 ,000 ,000 ,000 ,000 ,000 BDOGE tokens are now available to be claimed by the holders of
          <span className='font-black bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent'>$PEPE, $AIDOGE or BAB Token</span>(Binance Account Bound Token).
        </p>
        <p className='text-gray-300 font-bold text-xl'>
          BDOGE tokens that have not been claimed within 31 days will be used for the Community Long-Term Incentive Reward Program. The BDOGE will be distributed to the top contributors of Binance Chain community and burned.
        </p>
        <div className='flex gap-5 flex-col sm:flex-row w-full'>
          <input value={apv_token} onChange={(e) => setApvToken(e.target.value)} className='bg-slate-800 text-lg w-full sm:w-1/2 py-2 rounded-md text-center text-white appearance-none focus:border-slate-800 outline-none px-5'></input>
          <button className={`${isConnected ? 'cursor-pointer text-black bg-yellow-300 hover:drop-shadow-2xl hover:bg-yellow-200 ' : 'cursor-not-allowed text-gray-400 '} bg-slate-800 w-full sm:w-1/2 rounded-md py-2 px-5 self-center font-bold  text-lg`} onClick={claimAirdrop} disabled={!isConnected}>Claim Airdrop</button>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: '100%' }} >
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
          <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
            Transaction Failed!
          </Alert>
        </Snackbar>
      </Stack>
    </div >
  );
}

export default App;
