import React from 'react';
import {SalesOrderRow} from "../../types";

const UserName = ({row}: { row: SalesOrderRow }) => {
    const userName = row.UserLogon === 'websites' && !row.CurrentInvoiceNo ? row.UpdatedByUser : row.UserLogon;
    if (row.isB2B) {
        return (
            <>
                <span className="badge bg-primary">B2B</span>
                <span className="ms-1">{userName}</span>
            </>
        )
    }
    if (row.isEDI) {
        return (
            <>
                <span className="badge bg-info text-light">EDI</span>
                <span className="ms-1">{userName}</span>
            </>
        )
    }
    if (row.isWebsite) {
        return (
            <span className="badge bg-dark">Shopify</span>
        )
    }

    return (
        <span>{row.UserLogon}</span>
    )
}
export default UserName;
