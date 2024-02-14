import HistoryTitles from "./HistoryTitles";
import { histHeader } from "../data";
import HistoryData from "./HistoryData";
import { histData } from "../data";
function HistoryTable() {
    return (
        <table>
            <tbody>
                <tr className="header-row bg-[#4acd8d]">
                    {histHeader.map((item) => <HistoryTitles title={item} key={item} />)}
                </tr>
                {histData.map((item, index) => <HistoryData key={item.walletID} {...item} index={index} />)}
            </tbody>
        </table>
    )
}

export default HistoryTable;