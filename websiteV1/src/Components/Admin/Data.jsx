import { useContract, useContractRead , useContractWrite } from "@thirdweb-dev/react";
import { BasecontractABI } from "../../constants";
import { Web3Button } from "@thirdweb-dev/react";

function Data({ title, owner, CampaignAddress, index, children }) {
    const { contract } = useContract(
        CampaignAddress,
        BasecontractABI
    );
    const { data: Status, isLoading, error } = useContractRead(
        contract,
        "campaignStatus",
    );

    const { mutateAsync, isLoading1, error1 } = useContractWrite(
        contract,   
        "setCampaignActive"
    );
    
    const { mutateAsync: mutateAsync2, isLoading2, error2 } = useContractWrite(
        contract,
        "setCampaignDenied"
    );
    if(Status === 2)
        console.log(Status);
    return (
        Status == "2" &&
        <tr className={"data-roww"}>
            <td>{owner}</td>
            <td>{title}</td>
            <td className="flex items-center justify-center gap-3">
                <div>
                    <Web3Button
                        contractAddress={CampaignAddress}
                        action={()=>mutateAsync({args:[]})}
                    >
                        Accept
                    </Web3Button>
                </div>
                <div>
                    <Web3Button
                        contractAddress={CampaignAddress}
                        action={() => mutateAsync2({ args: [] })}
                    >
                        Reject
                    </Web3Button>
                </div>
            </td>
        </tr>
    )
}
export default Data;