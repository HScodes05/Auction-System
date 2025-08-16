# Auction-System

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-Frontend-blue)](https://reactjs.org/)
[![WebSockets](https://img.shields.io/badge/WebSockets-Real--time-red)](https://socket.io/)

A full-stack, real-time auction platform. The backend is powered by Node.js and Express, using Sequelize for database management with PostgreSQL via Supabase and Redis for high-speed caching. The frontend is a single-page application built with React, featuring a live countdown timer and bidding updates through WebSockets (Socket.IO).

## Key Features and Highlights

- Real-time bidding with WebSockets
- Live countdown timer for auctions
- Secure database management with Sequelize and PostgreSQL
- High-speed caching with Redis

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/Auction-System.git
   ```

2. Install dependencies for backend:
   ```bash
   cd Auction-System/backend
   npm install
   ```

3. Install dependencies for frontend:
   ```bash
   cd Auction-System/frontend
   npm install
   ```

## Usage

1. Start the backend server:
   ```bash
   cd Auction-System/backend
   npm start
   ```

2. Start the frontend application:
   ```bash
   cd Auction-System/frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`

## Dependencies

- Node.js
- Express
- Sequelize
- PostgreSQL
- Redis
- React
- Socket.IO

## Contributing

Contributions are welcome! To contribute to Auction-System, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
