import React from 'react';
import {SalesOrderRow} from "../../types";
import Tooltip from "@mui/material/Tooltip";
import {dateCreated, dateUpdated} from "../../utils";

const UserName = ({row}: { row: SalesOrderRow }) => {
    const userName = row.UserLogon === 'websites' && !row.CurrentInvoiceNo ? row.UpdatedByUser : row.UserLogon;
    const ttTitle = (
        <div>
            <div>Created: {dateCreated(row)} by {row.UserLogon}</div>
            <div>Updated: {dateUpdated(row)} by {row.UpdatedByUser}</div>
        </div>
    );
    if (row.isB2B) {
        return (
            <Tooltip title={ttTitle}>
                <div>
                    <span className="badge bg-primary">B2B</span>
                    <span className="ms-1">{userName}</span>
                </div>
            </Tooltip>
        )
    }
    if (row.isEDI) {
        return (
            <Tooltip title={ttTitle}>
                <div>
                    <span className="badge bg-info text-light">EDI</span>
                    <span className="ms-1">{userName}</span>
                </div>
            </Tooltip>
        )
    }
    if (row.isWebsite) {
        return (
            <Tooltip title={ttTitle}>
                <span className="badge bg-secondary">Shopify</span>
            </Tooltip>
        )
    }

    return (
        <Tooltip title={ttTitle}>
            <span>{row.UserLogon}</span>
        </Tooltip>
    )
}
export default UserName;
