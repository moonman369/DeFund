// import React, { useState, useEffect } from 'react';
// import { DisplayCampaigns } from '../components';
// import { useStateContext } from '../context';

// const Home = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [campaigns, setCampaigns] = useState([]);

//   const { address, contract, getCampaigns } = useStateContext();

//   const fetchCampaigns = async () => {
//     setIsLoading(true);
//     const data = await getCampaigns();
//     setCampaigns(data);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     if (contract) fetchCampaigns();
//   }, [address, contract]);

//   return (
//     <div>
//       <DisplayCampaigns
//         title="All Campaigns"
//         isLoading={isLoading}
//         campaigns={campaigns}
//       />
//     </div>
//   );
// };

// export default Home;

import React from 'react';

const Home = () => {
  return (
    <div>
      <p className="text-[80px] max-[400px]:text-[35px] font-bold font-epilogue text-center bg-clip-text bg-gradient-to-r from-[#0658c2] to-[#12be6b] text-transparent">
        Welcome to DeFund
      </p>
    </div>
  );
};

export default Home;
