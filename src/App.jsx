import React, { useState, useEffect, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ethers } from 'ethers';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';

// Create a context to share blockchain data across components
export const BlockchainContext = createContext();

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }
      
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      const account = accounts[0];
      setAccount(account);
      
      await setupBlockchain(account);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const setupBlockchain = async (currentAccount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      
      // Check if connected account is the owner
      const contractOwner = await contract.owner();
      setIsOwner(contractOwner.toLowerCase() === currentAccount.toLowerCase());
      
      setLoading(false);
    } catch (error) {
      console.error("Error setting up blockchain:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setupBlockchain(accounts[0]);
          } else {
            setLoading(false);
          }
        });
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setupBlockchain(accounts[0]);
        } else {
          setAccount(null);
          setIsOwner(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

  const contextValue = {
    account,
    provider,
    signer,
    contract,
    isOwner,
    loading,
    connectWallet
  };

  return (
    <BlockchainContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-center" />
        <Navigation />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg">Loading...</p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </BlockchainContext.Provider>
  );
}

export default App;