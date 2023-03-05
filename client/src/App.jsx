import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  Home,
  Campaigns,
  CampaignDetails,
  CreateCampaign,
  Profile,
  SearchResults,
} from './pages';
import { Sidebar, Navbar } from './components';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import 'react-notifications/lib/notifications.css';
import { useStateContext } from './context';
const App = () => {
  const { address } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!address) {
      navigate('/');
    }
  }, [address]);
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
        <NotificationContainer />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/" element={<Home />} />
          <Route path="/search-results/:param" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
        <NotificationContainer />
      </div>
    </div>
  );
};

export default App;
