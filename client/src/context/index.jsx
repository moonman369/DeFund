import React, { useContext, createContext } from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { parse } from '@ethersproject/transactions';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    '0x120EA1395144737693710c9Ed8eF390ba5C64b19'
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign'
  );

  const address = useAddress();

  const connect = useMetamask();

  const disconnect = useDisconnect();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // caller
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log('Contract call success', data);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call('getAllCampaigns');
    const parsedCampaigns = campaigns.map((campaign, index) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.imageUri,
      id: index,
    }));

    console.log(parsedCampaigns);

    return parsedCampaigns.reverse();
  };

  const getCampaignById = async (id) => {
    const parsedId = Number(id);
    if (!parsedId) return false;
    const campaign = await contract.call('getCampaignById', parsedId);
    return {
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.imageUri,
    };
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const getCampaignCount = async () => {
    const count = await contract.call('campaignCount');
    return count;
  };

  const getUserCampaignCount = async (owner) => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === owner
    );
    return filteredCampaigns.length;
  };

  const donate = async (id, amount) => {
    const data = await contract.call('donateToCampaign', id, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (id) => {
    const donations = await contract.call('getDonators', id);
    const numberOfDonations = donations.length;

    return donations.map((element) => {
      return {
        donator: element.account,
        donation: ethers.utils.formatEther(element.amount),
      };
    });
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        disconnect,
        getCampaigns,
        getUserCampaigns,
        getUserCampaignCount,
        createCampaign: publishCampaign,
        donate,
        getDonations,
        getCampaignById,
        getCampaignCount,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
