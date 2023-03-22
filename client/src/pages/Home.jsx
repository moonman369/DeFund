import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

const Home = () => {
  return (
    <div>
      <h1 className="text-[80px] max-[400px]:text-[35px] font-bold font-epilogue text-center bg-clip-text bg-gradient-to-r from-[#0658c2] to-[#12be6b] text-transparent">
        Welcome to DeFund
      </h1>

      <p className="text-left text-[#c5c9c8] font-epilogue text-[17px] mx-[5%] my-4 ">
        This is where crowdfunding meets the world of Decentralized Web. Using
        DeFund, you can create customized campaigns representing your ideas and
        raise funds in crypto. DeFund is a Crowdfunding platform based on the
        famous Ethereum Network. The fact that DeFund uses blockchain technology
        under the hood implies that it comes with the perks of decentralization.
        <br />
        <br /> It's Salient Features are as follows:
        <span>
          <li className="text-[#15e27f]">Completely Decentralized</li>
          <li className="text-[#23df81]">Highly Secured</li>
          <li className="text-[#23dfb6]">Fully Tamperproof</li>
          <li className="text-[#23d9df]">Entirely Transparent</li>
          <li className="text-[#23b3df]">Non-Private</li>
          <li className="text-[#2384df]">Censorship Resistant</li>
        </span>
        <br />
        The design of the app is extremely simple. You can use the sidebar
        (toggle bar for small devices) section to navigate to various pages .
        All you need is a Metamask Account and boom you can create and donate to
        as many campaigns as you want. <br />
        <br />
        Just connect your Metamask account with the{' '}
        <span className="bg-gradient-to-r from-[#8c6dfd] to-[#d47c34] font-epilogue font-semibold test-[16px] leading-[26px] text-white min-h-[52px] px-2 py-2 rounded-[10px]">
          Connect
        </span>{' '}
        button on the top right corner (toggle option for small devices) and
        raise funds for your unique campaign idea, the Web3 way...
        <br />
        <br />
        Users who don't have Metamask installed, can install it from these
        links:
        <br />
        <ul className="p-4">
          <li className="font-epilogue flex font-semibold text-[#d47c34] mb-2">
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              className="flex"
            >
              Chrome Extension &nbsp; <FiExternalLink />
            </a>
          </li>
          <li className="font-epilogue flex font-semibold text-[#cc4a7c] mb-2">
            <a
              href="https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&ref=producthunt&_branch_match_id=1103225679164445192&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz00tScxNLM7WSywo0MvJzMvWT6ooz3a1yHeztAQA/OIqTSQAAAA%3D&pli=1"
              className="flex"
            >
              Android App &nbsp; <FiExternalLink />
            </a>
          </li>
          <li className="font-epilogue flex font-semibold text-[#8c6dfd] mb-2">
            <a
              href="https://apps.apple.com/us/app/metamask/id1438144202?_branch_match_id=1103225679164445192&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz00tScxNLM7WSywo0MvJzMvWL8529DB2SnSztAQA5G46IyQAAAA%3D"
              className="flex"
            >
              iOS App &nbsp; <FiExternalLink />
            </a>
          </li>
        </ul>
      </p>
    </div>
  );
};

export default Home;
