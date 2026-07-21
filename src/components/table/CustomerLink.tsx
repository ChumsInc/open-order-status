import type {SalesOrderRow} from "@/src/types";
import {customerKey} from "@/utils/utils";
import type {ReactNode} from "react";


const CustomerLink = ({row, children}: { row: SalesOrderRow; children: ReactNode }) => {
    const url = `/reports/account/orderhistory/?company=chums&customer=${customerKey(row)}`;
    return <a href={url} target="_blank" rel="noreferrer">{children}</a>
}
export default CustomerLink;
