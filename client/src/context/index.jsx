import React, { useContext, createContext, useEffect } from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useBalance,
  useDisconnect,
  useContractWrite,
  useChainId,
} from '@thirdweb-dev/react';
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import { parse } from '@ethersproject/transactions';

const GOERLI_CHAIN_ID = 5;
const GOERLI_RPC_URL = 'https://rpc.ankr.com/eth_goerli';

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

  const chainId = useChainId();

  const disconnect = useDisconnect();

  const balance = useBalance(NATIVE_TOKEN_ADDRESS);

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
    if (parsedId === NaN) return false;
    const campaign = await contract.call('getCampaignById', parsedId);
    if (campaign.owner === '0x0000000000000000000000000000000000000000')
      return false;
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
      id: id,
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
    const data = await contract
      .call('donateToCampaign', id, {
        value: ethers.utils.parseEther(amount),
      })
      .catch((e) => false);

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

  const switchToGoerli = async () => {
    try {
      await window?.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${GOERLI_CHAIN_ID.toString(16)}`,
          },
        ],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window?.ethereum?.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${GOERLI_CHAIN_ID.toString(16)}`,
                chainName: 'Goerli Testnet',
                nativeCurrency: {
                  name: 'Goerli ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
                blockExplorerUrls: ['https://goerli.etherscan.io/'],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  };

  useEffect(() => {
    const switchChain = async () => {
      await switchToGoerli();
    };
    switchChain();

    // window?.ethereum?.on('chainChanged', () => {
    //   switchChain();
    // });
  }, []);

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        balance,
        chainId,
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
        switchToGoerli,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
