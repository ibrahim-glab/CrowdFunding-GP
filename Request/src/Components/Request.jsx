import RequestTitles from "./RequestTitles";
import { requestHeader } from "../data.js";
function Request() {
    return (
        <div id="reqHeader">
            <ul>
                {requestHeader.map((item) => <RequestTitles title={item} />)}
            </ul>
        </div>
    )
}
export default Request;