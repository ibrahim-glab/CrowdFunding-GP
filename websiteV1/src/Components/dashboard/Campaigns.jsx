import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContract , useContractRead } from '@thirdweb-dev/react';
import { BasecontractABI, contractABI } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../../assets';

const Campaigns = ({ title, isLoading, campaigns }) => {
  //   const navigate = useNavigate();

  //   const handleNavigate = (campaign) => {
  //     navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  //   }

  // Show Data For Campigns addresses after retrive addresses use it in each Camp Component to retrive data for each one of them
  const { contract } = useContract( "0x2464d306066264089FC4e7D006ae7E9270b19E68", contractABI);
  console.log(contract);
  const { data, isLoading1, error } = useContractRead(
  contract,
  "getDeployedProjects",
);
console.log(data);
/// show addresses for all  campigns


  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard
          key={uuidv4()}
          {...campaign}
        //handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default Campaigns; 