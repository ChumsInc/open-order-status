import React from 'react';
import {SalesOrderRow} from "../../types";

const HoldReasonBadge = ({row}: { row: SalesOrderRow }) => {
    if (!row.CancelReasonCode) {
        return null;
    }
    return <span className="badge bg-warning text-dark">
        {row.CancelReasonCode}
    </span>
}

export default HoldReasonBadge;
