import Titles from "./Titles";
import Data from "./Data";
import { requestHeader, histHeader } from "../../../data";
import { v4 as uuidv4 } from "uuid";
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
        {data.map((item, index) =>
            <Data key={uuidv4()} {...item} index={index} />
        )}
      </tbody>
    </table>
  );
}
export default Table;
