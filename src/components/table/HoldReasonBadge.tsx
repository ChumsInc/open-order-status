import React from 'react';
import {SalesOrderRow} from "_src/types";

const HoldReasonBadge = ({row}: { row: SalesOrderRow }) => {
    if (!row.CancelReasonCode) {
        return null;
    }
    return (
        <span className="badge text-bg-warning">
            {row.CancelReasonCode}
        </span>
    )
}

export default HoldReasonBadge;
