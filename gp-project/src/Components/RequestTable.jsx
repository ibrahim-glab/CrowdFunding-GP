import RequestTitles from "./RequestTitles";
import { requestHeader } from "../data";
import RequestData from "./RequestData";
function RequestTable({ filteredData }) {
    return (
        <table>
            <tbody>
                <tr className="header-row">
                    {requestHeader.map((item) => <RequestTitles title={item} key={item} />)}
                </tr>
                {filteredData.map((item, index) => <RequestData key={item.walletID} {...item} index={index} />)}
            </tbody>
        </table>
    )
}

export default RequestTable;