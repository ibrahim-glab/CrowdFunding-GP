import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { BasecontractABI } from '../../constants';
import { Web3Button } from '@thirdweb-dev/react';

const Data = ({ title, owner, CampaignAddress, index, children }) => {
  const { contract } = useContract(CampaignAddress, BasecontractABI);
  const { data: status, isLoading, error } = useContractRead(contract, 'campaignStatus');
  const { mutateAsync: setCampaignActive } = useContractWrite(contract, 'setCampaignActive');
  const { mutateAsync: setCampaignDenied } = useContractWrite(contract, 'setCampaignDenied');

  const isStatusTwo = status === 2;

  if (isStatusTwo) console.log(status);



  const createActionButton = (action, label) => (
    <div>
      <Web3Button contractAddress={CampaignAddress} action={() => action({ args: [] })}>
        {label}
      </Web3Button>
    </div>
  );

  return isStatusTwo && (
    <tr className='data-roww'>
      <td>{owner}</td>
      <td>{title}</td>
      <td className='flex items-center justify-center gap-3'>
        {createActionButton(setCampaignActive, 'Accept')}
        {createActionButton(setCampaignDenied, 'Reject')}
      </td>
    </tr>
  );
}

export default Data;