// backend/index.js

const express = require('express');
const app = express();
const sequelize = require('./config/database');
const Auction = require('./models/auction');

// Import socket.io, redis, and http
const { Server } = require('socket.io');
const { createClient } = require('redis');
const http = require('http');

// Use this to parse JSON request bodies
app.use(express.json());

// Create the http server and wrap your express app in it
const server = http.createServer(app);

// Initialize socket.io with the http server
const io = new Server(server);

// Redis client setup
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

// Sync the models with the database
sequelize.sync().then(() => {
    console.log('Database synced!');
}).catch(err => {
    console.error('Failed to sync database:', err);
});

// Route for creating a new auction
app.post('/api/auctions', async (req, res) => {
    try {
        const newAuction = await Auction.create(req.body);
        res.status(201).json(newAuction);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create auction' });
    }
});

// A simple object to map user IDs to their socket IDs
const userSockets = {};

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('user_login', (userId) => {
        userSockets[userId] = socket.id;
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    });

    socket.on('disconnect', () => {
        for (const userId in userSockets) {
            if (userSockets[userId] === socket.id) {
                delete userSockets[userId];
                console.log(`User ${userId} disconnected.`);
                break;
            }
        }
    });

    socket.on('join_auction', (auctionId) => {
        socket.join(auctionId);
    });

    socket.on('place_bid', async (data) => {
        // Data should include auctionId and bidAmount
        const { auctionId, bidAmount } = data;

        // Get the current highest bid from Redis
        const currentHighestBid = await redisClient.get(`auction:${auctionId}:highestBid`) || 0;
        
        // Find the auction to get the bid increment
        const auction = await Auction.findByPk(auctionId);

        if (bidAmount >= parseFloat(currentHighestBid) + auction.bidIncrement) {
            // Save the new bid to Supabase
            await Bid.create({ auctionId, bidAmount });

            // Update the highest bid in Redis
            await redisClient.set(`auction:${auctionId}:highestBid`, bidAmount);

            // Broadcast the new bid to everyone in the room
            io.to(auctionId).emit('bid_update', { newHighestBid: bidAmount });
            
            // Notify seller and previous highest bidder
            io.to(sellerId).emit('notification', 'New bid placed!');
            io.to(previousBidderId).emit('notification', 'You have been outbid!');
        } else {
            socket.emit('bid_error', { message: 'Bid is too low.' });
        }
    });
});

const PORT = process.env.PORT || 3001;
// Start the server, listening on the specified port
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));