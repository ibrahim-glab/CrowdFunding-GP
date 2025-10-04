import Titles from "./Titles";
import Data from "./Data";
import { requestHeader, histHeader } from "../../../data";
import { v4 as uuidv4 } from "uuid";

function Table({ data, isRequestPage, statusFilter }) {
  const headers = isRequestPage ? requestHeader : histHeader;
  return (
    <div className="overflow-scroll">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#4acd8d]">
          <tr className="header-row">
            {headers.map((title, index) => (
              <Titles key={index} title={title} />
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <Data key={uuidv4()} statusFilter={statusFilter} isRequestPage={isRequestPage} {...item} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
