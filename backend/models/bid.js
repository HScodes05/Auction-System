// backend/models/bid.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Auction = require('./auction'); // Import the Auction model

const Bid = sequelize.define('Bid', {
    bidAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // This column will store the ID of the auction
    auctionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Auction, // Reference the Auction model
            key: 'id'
        }
    }
});

// Define the association: an Auction has many Bids
Auction.hasMany(Bid);
// A Bid belongs to a single Auction
Bid.belongsTo(Auction);

module.exports = Bid;