import { ethers } from 'ethers';
import React, { useState, useEffect, useRef } from 'react';
import { NotificationManager } from 'react-notifications';
import { useLocation } from 'react-router-dom';
import { thirdweb } from '../assets';
import { CustomButton, CountBox, Loader } from '../components';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';

const CampaignDetails = () => {
  const { state } = useLocation();
  const input = useRef();
  const {
    connect,
    donate,
    getDonations,
    getUserCampaignCount,
    getCampaignCount,
    contract,
    address,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [campaignCount, setCampaignCount] = useState(0);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.id);
    setDonators(data);
    setIsLoading(false);
    input.current.value = '';
  };

  const fetchCampaignCount = async () => {
    const count = await getUserCampaignCount(state.owner);
    setCampaignCount(count);
  };

  const isIdValid = async () => {
    const isIdValid =
      state.id >= 0 || state.id < (await getCampaignCount()).toNumber();
    isLoading(false);
    return isIdValid;
  };

  useEffect(() => {
    if (contract) {
      fetchDonators();
      fetchCampaignCount();
    }
  }, [contract, address]);

  const handleDonate = async () => {
    if (amount <= 0) {
      // alert('Please enter a non-zero, positive donation amount.');
      NotificationManager.warning(
        'Please enter a non-zero, positive donation amount.',
        'Invalid value',
        3000
      );
      input.current.value = '';
      return;
    }
    // console.log(state);
    if (!address) {
      connect();
    }
    input.current.value = '';
    setIsLoading(true);

    const res = await donate(state.id, amount);
    if (!res) {
      setIsLoading(false);
      input.current.value = '';
    } else {
      await fetchDonators();
      setIsLoading(false);
      input.current.value = '';
      return;
    }
    input.current.value = '';
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-[10px] gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl mb-5"
          />
          <progress
            value={state.amountCollected}
            max={state.target}
            className="relative w-full h-[6px] bg-[#3b3b44] mt-2 rounded-xl"
          ></progress>
          {/* <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )} %`,
                maxWidth: '100%',
                color: 'white',
              }}
            ></div>
          </div> */}
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <div className="">
              <h4 className="font-epilogue font-semibold text-[18px] text-white p-3">
                CAMPAIGN ID
                <span className="text-[#57f08a] ml-3 p-2 rounded-[5px] bg-[#28282e]">
                  {state.id}
                </span>
              </h4>
            </div>

            <h4 className="font-epilogue font-semibold text-[18px] text-white p-3">
              CREATOR
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  {campaignCount} Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              {state.description.includes(' ') ? (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {state.description}
                </p>
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify truncate">
                  {`${state.description.slice(0, 100)}...`}
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue fonr-normal text-[16px] text-[#b2b3bd]">
                      {index + 1}.{' '}
                      <a
                        href={`https://goerli.etherscan.io/address/${item.donator}`}
                        target="_blank"
                        className="text-[#6ef3cb]"
                      >
                        {item.donator.slice(0, 8)}......
                        {item.donator.slice(-6, item.donator.length)}
                      </a>
                    </p>
                    <p className="font-epilogue fonr-normal text-[16px] text-[#808191]">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No Donators yet. Be the first one.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 mt-[20px]">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20x] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px] ">
              <input
                ref={input}
                type="number"
                placeholder="0.01 ETH"
                min="0"
                step="0.01"
                className="w-full py-[10px] px-[10px] sm:px-[20px] px[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal text-[14px] leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>
              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-gradient-to-r from-[#8c6dfd] to-[#d47c34]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
