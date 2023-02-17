import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const SearchResults = () => {
  const { getCampaignById } = useStateContext();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  console.log(state.queryId);
  const displayResult = async () => {
    setIsLoading(true);
    const res = await getCampaignById(state.queryId);
    console.log(res);
    if (res) {
      setCampaign(res);
    }
    setIsLoading(false);
  };
  useEffect(() => {
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
        'No Search Results were found'
      )}
    </div>
  );
};

export default SearchResults;
