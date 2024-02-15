import HistoryTitles from "./HistoryTitles.jsx";
import { histHeader } from "../data.js";
function History() {
    return (
        <div id="reqHeader">
            <ul>
                {histHeader.map((item) => <HistoryTitles title={item} />)}
            </ul>
        </div>
    )
}
export default History;