import React from 'react';
import {SalesOrderRow} from "../../types";

const UserName = ({row}: { row: SalesOrderRow }) => {
    if (row.isEDI) {
        return (
            <span className="badge bg-info text-light">
                {['EDI', row.UserLogon === 'websites' ? null : row.UserLogon].filter(val => !!val).join(' / ')}
            </span>
        )
    }
    if (row.isB2B) {
        return (
            <span className="badge bg-primary">
                {['B2B', row.UserLogon === 'websites' ? null : row.UserLogon].filter(val => !!val).join(' / ')}
            </span>
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
