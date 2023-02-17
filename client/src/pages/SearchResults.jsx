import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const { state } = useLocation();
  console.log(state);
  return <div>SearchResults</div>;
};

export default SearchResults;
