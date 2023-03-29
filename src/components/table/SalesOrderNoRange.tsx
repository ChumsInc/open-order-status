import React from "react";

const SalesOrderNoRange = ({salesOrderNos, onClick}: { salesOrderNos: string[], onClick: () => void }) => {
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
        <div className="d-flex justify-content-between align-items-baseline"
             style={{cursor: 'pointer'}} onClick={onClick}>
            <div>{firstDigits.join('')}&hellip;{result.join('')}</div>
            <div>
                <small className="ms-1">({salesOrderNos.length})</small>
            </div>
        </div>
    );
}

export default SalesOrderNoRange;
