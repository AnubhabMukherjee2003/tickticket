import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { ethers } from 'ethers';

const EventCard = ({ event, buyTicket }) => {
  const [selectedSeat, setSelectedSeat] = useState('');
  const [availableSeats, setAvailableSeats] = useState([]);
  
  useEffect(() => {
    // Create an array of available seats based on max tickets
    const seats = Array.from({ length: event.maxTickets }, (_, i) => i + 1);
    setAvailableSeats(seats);
  }, [event.maxTickets]);

  const handlePurchase = () => {
    if (!selectedSeat) {
      alert("Please select a seat");
      return;
    }
    buyTicket(event.id, selectedSeat);
    setSelectedSeat('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Ticket className="h-5 w-5 mr-2" />
            <span>{event.tickets} tickets available</span>
          </div>
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">
              Cost: {ethers.utils.formatEther(event.cost)} ETH
            </p>
          </div>
          
          {event.tickets > 0 ? (
            <>
              <div className="mt-4">
                <select
                  value={selectedSeat}
                  onChange={(e) => setSelectedSeat(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select a seat</option>
                  {availableSeats.map((seat) => (
                    <option key={seat} value={seat}>
                      Seat {seat}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handlePurchase}
                disabled={!selectedSeat}
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
              >
                Buy Ticket
              </button>
            </>
          ) : (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
              Sold Out
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;