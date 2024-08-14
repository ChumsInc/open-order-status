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
                    <div className="ms-1">{userName}</div>
                    <div className="badge text-bg-primary">B2B</div>
                </div>
            </Tooltip>
        )
    }
    if (row.isEDI) {
        return (
            <Tooltip title={ttTitle}>
                <div>
                    <div className="ms-1">{userName}</div>
                    <div className="badge text-bg-info">EDI</div>
                </div>
            </Tooltip>
        )
    }
    if (row.isWebsite) {
        return (
            <Tooltip title={ttTitle}>
                <span className="badge text-bg-secondary">Shopify</span>
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
