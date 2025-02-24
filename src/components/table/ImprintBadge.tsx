import React from 'react';
import {SalesOrderRow} from "_src/types";

const ImprintBadge = ({row}: { row: SalesOrderRow }) => {
    if (!row.UDF_IMPRINTED || row.UDF_IMPRINTED === 'N') {
        return null;
    }
    return <span className="badge text-bg-info">IMP</span>
}

export default ImprintBadge;
