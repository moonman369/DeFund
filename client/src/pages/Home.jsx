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
      <h1 className="text-[80px] max-[400px]:text-[35px] font-bold font-epilogue text-center bg-clip-text bg-gradient-to-r from-[#0658c2] to-[#12be6b] text-transparent">
        Welcome to DeFund
      </h1>

      <p className="text-justify text-[#c5c9c8] font-epilogue text-[18px] mx-[3rem] my-4 ">
        This is where crowdfunding meets the world of Decentralized Web. Using
        DeFund, you can create customized campaigns representing your ideas and
        raise funds in crypto. DeFund is a Crowdfunding platform based on the
        famous Ethereum Network. The fact that DeFund uses blockchain technology
        under the hood implies that it comes with the perks of decentralization.{' '}
        <br />
        <br /> It's Salient Features are as follows:
        <div className="text-[#23df84] text-transparent">
          <li>Completely Decentralized</li>
          <li>Highly Secured</li>
          <li>Fully Tamperproof</li>
          <li>Entirely Transparent</li>
          <li>Non-Private</li>
          <li>Censorship Resistant</li>
        </div>
        <br />
        The design of the app is extremely simple. All you need is a Metamask
        Account and boom you can create and donate to as many campaigns as you
        want. <br />
        Just connect your Metamask account with the{' '}
        <span className="bg-gradient-to-r from-[#8c6dfd] to-[#d47c34] font-epilogue font-semibold test-[16px] leading-[26px] text-white min-h-[52px] px-2 py-2 rounded-[10px]">
          Connect
        </span>{' '}
        button on the top right corner (toggle option for small devices) and
        raise funds for your idea, the Web3 way...
      </p>
    </div>
  );
};

export default Home;
