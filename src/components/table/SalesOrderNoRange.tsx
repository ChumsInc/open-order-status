import React from "react";
import {SalesOrderRow} from "../../types";
import SalesOrderToggle from "./SalesOrderToggle";

const SalesOrderNoRange = ({row, salesOrderNos, onClick}: {
    row: SalesOrderRow;
    salesOrderNos: string[];
    onClick: () => void;
}) => {
    if (!salesOrderNos.length) {
        return null;
    }
    const list = [...salesOrderNos].sort();
    if (list.length <= 1) {
        return <>{list[0] ?? ''}</>;
    }
    const firstDigits = list[0].split('');
    const lastDigits = [...list].reverse()[0].split('');
    const result: string[] = [];
    let failed = false;
    firstDigits.forEach((d, index) => {
        if (failed || lastDigits[index] !== d) {
            result.push(lastDigits[index] ?? '');
            failed = true;
        }
    })

    return (
        <>
            <div style={{cursor: 'pointer'}} onClick={onClick}>
                {firstDigits.join('')}&hellip;{result.join('')}
            </div>
            <div className="d-flex justify-content-between">
                <small className="ms-1">({salesOrderNos.length})</small>
                <SalesOrderToggle row={row}/>
            </div>
        </>
    );
}

export default SalesOrderNoRange;
