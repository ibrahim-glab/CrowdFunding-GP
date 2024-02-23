import { adminData } from "../../../data";
import Data from "./Data";
import { ConnectWallet } from "@thirdweb-dev/react";
function PendingRequests() {

    return (
        <div>
            {/* <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
                <div className="w-[52px] h-[52px] flex justify-center items-center cursor-pointer relative">
                    <ConnectWallet />
                </div>
            </div> */}
            <div className="adminHeader flex items-center justify-around bg-[#232B2B] p-4">
                <h2 className="text-white text-[20px] font-bold">Pending Requests</h2>
                <input
                    type="text"
                    placeholder="Search for campaigns"
                    className="flex w-[300px] font-epilogue font-normal text-[14px] placeholder:text-[#232B2B] text-[232B2B] bg-[#fff] outline-none p-2"
                />
            </div>
            <table>
                <tbody>
                    <tr className="admin-row">
                        <th>Wallet ID</th>
                        <th>Owner Name</th>
                        <th>
                            Decision
                        </th>
                    </tr>
                    {adminData.map((item, index) => <Data key={item.walletID} {...item} index={index}>
                        <td className="flex items-center justify-center gap-3">
                            <button className="accept bg-[#ECEFF1] p-2 rounded-[10px] text-[#a1a3a4] text-sm">
                                <i className="fa fa-check mr-2"></i>
                                <span>Accept</span></button>
                            <button className="reject bg-[#ECEFF1] p-2 rounded-[10px] text-[#a1a3a4] text-sm">
                                <i className="fa fa-trash mr-2 "></i>
                                <span>Reject</span>
                            </button>
                        </td>
                    </Data>)}
                </tbody>
            </table>
        </div>
    )
}
export default PendingRequests;