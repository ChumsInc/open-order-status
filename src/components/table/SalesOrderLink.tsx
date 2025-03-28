import React from "react";

const SalesOrderLink = ({salesOrderNo}: { salesOrderNo: string }) => {
    const url = `/reports/account/salesorder/?company=CHI&salesorderno=${salesOrderNo}`;
    return (<a href={url} target="_blank" rel="noreferrer">{salesOrderNo}</a>);
}
export default SalesOrderLink;
