import React from 'react';
import {SalesOrderRow} from "../../types";

export default function InvoiceBadge({row}: { row: SalesOrderRow }) {
    if (!row.CurrentInvoiceNo) {
        return null;
    }
    const params = new URLSearchParams({company: 'chums', invoice: row.CurrentInvoiceNo});
    const invoiceUrl = `/reports/account/invoice/?${params.toString()}`
    return (
        <a href={invoiceUrl} target="_blank" rel="noreferrer" className="badge text-bg-success">
            {row.CurrentInvoiceNo}
        </a>
    )
}
