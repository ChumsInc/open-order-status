import React from 'react';
import {SalesOrderRow} from "../../types";

const ImprintBadge = ({row}: { row: SalesOrderRow }) => {
    if (!row.UDF_IMPRINTED || row.UDF_IMPRINTED === 'N') {
        return null;
    }
    return <span className="badge bg-info text-light">IMP</span>
}

export default ImprintBadge;
