import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_LIVE_AUCTIONS, UPCOMING_AUCTIONS } from '../data/auctions';
import { useToast } from './ToastContext';

const AuctionContext = createContext(null);
const AUCTIONS_STORAGE_KEY = 'veyra_live_auctions_data';
const REMINDERS_STORAGE_KEY = 'veyra_auction_reminders';

export const AuctionProvider = ({ children }) => {
  const { addToast } = useToast();

  // Initialize live auctions with absolute end timestamps
  const [liveAuctions, setLiveAuctions] = useState(() => {
    try {
      const saved = localStorage.getItem(AUCTIONS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved auctions', e);
    }

    const now = Date.now();
    return INITIAL_LIVE_AUCTIONS.map((auc) => ({
      ...auc,
      endTime: now + auc.endsInSeconds * 1000,
      remainingSeconds: auc.endsInSeconds
    }));
  });

  // Upcoming auctions
  const [upcomingAuctions] = useState(UPCOMING_AUCTIONS);

  // Reminders state
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem(REMINDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Persist live auction bids & reminders
  useEffect(() => {
    try {
      localStorage.setItem(AUCTIONS_STORAGE_KEY, JSON.stringify(liveAuctions));
    } catch (e) {
      console.warn('Failed to save auctions to localStorage', e);
    }
  }, [liveAuctions]);

  useEffect(() => {
    try {
      localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders));
    } catch (e) {
      console.warn('Failed to save reminders to localStorage', e);
    }
  }, [reminders]);

  // Clean interval timer that stops at zero
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setLiveAuctions((prevAuctions) =>
        prevAuctions.map((auc) => {
          const diffMs = auc.endTime - now;
          const remaining = Math.max(0, Math.floor(diffMs / 1000));
          return auc.remainingSeconds === remaining
            ? auc
            : { ...auc, remainingSeconds: remaining };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const placeBid = (auctionId, amount, bidderName = 'You (Collector)') => {
    const auction = liveAuctions.find((a) => a.id === auctionId);
    if (!auction) {
      return { success: false, error: 'Auction object not found.' };
    }

    if (auction.remainingSeconds <= 0) {
      return { success: false, error: 'This auction has concluded.' };
    }

    const minRequired = auction.currentBid + auction.minIncrement;
    const bidAmount = Number(amount);

    if (isNaN(bidAmount) || bidAmount < minRequired) {
      return {
        success: false,
        error: `Minimum valid bid is ₹${minRequired.toLocaleString('en-IN')}.`
      };
    }

    const newBidRecord = {
      id: 'bid-' + Date.now(),
      bidder: bidderName,
      amount: bidAmount,
      time: 'Just now'
    };

    setLiveAuctions((prev) =>
      prev.map((auc) =>
        auc.id === auctionId
          ? {
              ...auc,
              currentBid: bidAmount,
              bidCount: auc.bidCount + 1,
              bidHistory: [newBidRecord, ...auc.bidHistory]
            }
          : auc
      )
    );

    addToast(`Bid of ₹${bidAmount.toLocaleString('en-IN')} placed on "${auction.name}".`);
    return { success: true };
  };

  const isReminderSet = (auctionId) => reminders.includes(auctionId);

  const toggleReminder = (auctionId) => {
    const auction = upcomingAuctions.find((a) => a.id === auctionId);
    const auctionTitle = auction ? auction.name : 'Auction';

    if (reminders.includes(auctionId)) {
      setReminders((prev) => prev.filter((id) => id !== auctionId));
      addToast(`Reminder removed for "${auctionTitle}".`);
    } else {
      setReminders((prev) => [...prev, auctionId]);
      addToast(`Reminder confirmed for "${auctionTitle}".`);
    }
  };

  return (
    <AuctionContext.Provider
      value={{
        liveAuctions,
        upcomingAuctions,
        placeBid,
        isReminderSet,
        toggleReminder
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuctions = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error('useAuctions must be used within an AuctionProvider');
  }
  return context;
};
