import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Adjust if needed

const AuctionDetail = () => {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [highestBid, setHighestBid] = useState(0);
    const [bidAmount, setBidAmount] = useState('');

    useEffect(() => {
        fetch(`/api/auctions/${auctionId}`)
            .then(res => res.json())
            .then(data => {
                setAuction(data);
                setHighestBid(data.startingPrice);
            });

        socket.emit('join_auction', auctionId);

        socket.on('bid_update', (data) => {
            setHighestBid(data.newHighestBid);
        });

        return () => {
            socket.off('bid_update');
        };
    }, [auctionId]);

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const bidValue = parseFloat(bidAmount);
        if (isNaN(bidValue) || bidValue <= highestBid) {
            alert('Please enter a valid bid higher than the current highest bid.');
            return;
        }
        socket.emit('place_bid', { auctionId, bidAmount: bidValue });
        setBidAmount('');
    };

    return (
        <div>
            {auction && (
                <>
                    <h1>{auction.itemName}</h1>
                    <p>Description: {auction.description}</p>
                    <p>Current Highest Bid: ${highestBid}</p>
                    <form onSubmit={handleBidSubmit}>
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={e => setBidAmount(e.target.value)}
                            placeholder="Your bid amount"
                        />
                        <button type="submit">Place Bid</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default AuctionDetail;