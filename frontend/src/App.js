import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuctionList from './components/AuctionList';
import AuctionDetail from './components/AuctionDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuctionList />} />
          <Route path="/auction/:auctionId" element={<AuctionDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
