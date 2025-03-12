import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import { BlockchainContext } from '../App';

const Navigation = () => {
  const { account, isOwner, connectWallet } = useContext(BlockchainContext);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <Ticket className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TickTicket</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Events
              </Link>
              
              {account && (
                <Link 
                  to="/my-tickets" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/my-tickets' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  My Tickets
                </Link>
              )}
              
              {isOwner && (
                <Link 
                  to="/admin" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/admin' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            {account ? (
              <div className="flex items-center">
                <span className="px-4 py-2 rounded-full bg-green-100 text-green-800">
                  Connected: {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;