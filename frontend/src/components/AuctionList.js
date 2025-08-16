import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AuctionList = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        fetch('/api/auctions')
            .then(res => res.json())
            .then(setAuctions);
    }, []);

    return (
        <div>
            <h2>All Auctions</h2>
            <ul>
                {auctions.map(auction => (
                    <li key={auction.id}>
                        <Link to={`/auction/${auction.id}`}>
                            {auction.itemName} - Starting at ${auction.startingPrice} - Live: {new Date(auction.goLiveDate).toLocaleString()}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuctionList;