import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const SearchResults = () => {
  const { getCampaignById } = useStateContext();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  // console.log(state.queryId);
  const displayResult = async () => {
    setIsLoading(true);
    const res = await getCampaignById(state.queryId);
    // console.log(res);
    if (res) {
      setCampaign(res);
    } else setCampaign(null);
    setIsLoading(false);
  };
  useEffect(() => {
    // console.log(state.queryId);
    displayResult();
  }, [state.queryId]);
  return (
    <div>
      {campaign ? (
        <DisplayCampaigns
          title="Search Results"
          campaigns={[campaign]}
          isLoading={isLoading}
        />
      ) : (
        <div className="font=epilogue font-semibold text-white text-[26px] justify-center text-center mt-[250px]">
          {`No Search Results were found for '${state.queryId}'`}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
