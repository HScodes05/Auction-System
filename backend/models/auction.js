// backend/models/auction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Auction = sequelize.define('Auction', {
    itemName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    startingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    bidIncrement: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    goLiveDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER, // duration in minutes
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'upcoming', 'closed'),
        defaultValue: 'upcoming'
    }
});

module.exports = Auction;