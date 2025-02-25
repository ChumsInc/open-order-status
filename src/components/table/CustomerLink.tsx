import React from 'react';
import {SalesOrderRow} from "@/src/types";
import {customerKey} from "@/utils/utils";


const CustomerLink = ({row, children}: { row: SalesOrderRow; children: React.ReactNode }) => {
    const url = `/reports/account/orderhistory/?company=chums&customer=${customerKey(row)}`;
    return <a href={url} target="_blank" rel="noreferrer">{children}</a>
}
export default CustomerLink;
