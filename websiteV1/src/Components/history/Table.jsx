import Titles from "./Titles";
import Data from "./Data";
import { requestHeader, histHeader } from "../../../data";
function Table({ data, isRequestPage }) {
  const headers = isRequestPage ? requestHeader : histHeader;
  return (
    <table>
      <tbody>
        <tr className="header-row bg-[#4acd8d]">
          {headers.map((title, index) => (
            <Titles key={index} title={title} />
          ))}
        </tr>
        {data.map((item, index) => (
          <Data key={item.walletID} {...item} index={index} />
        ))}
      </tbody>
    </table>
  );
}
export default Table;
