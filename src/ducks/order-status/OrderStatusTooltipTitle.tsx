import React from 'react';
import {OpenOrderStatusCode, SalesOrderRow} from "../../types";
import {useSelector} from "react-redux";
import {selectList} from "./index";

const OrderStatusTooltipTitle = ({row, currentStatus}:{
    row:SalesOrderRow,
    currentStatus?: OpenOrderStatusCode
}) => {
    const list = useSelector(selectList);

    if (!currentStatus && !row.status?.StatusHistory?.length) {
        return <span>Not Set</span>;
    }
    const statusDescription = (code:string) => {
        if (code.includes('=>')) {
            const [oldCode, newCode] = code.split('=>').map(code => code.trim());
            if (newCode) {
                code = newCode;
            }
            if (oldCode === newCode) {
                return 'Notes Updated';
            }
        }
        const [statusCode] = list.filter(sc => sc.StatusCode === code);
        return statusCode?.StatusDescription ?? 'Not Set'
    }
    return (
        <div>
            <div><strong>{currentStatus?.StatusDescription ?? 'Not Set'}</strong></div>
            <div className="mt-1">
                {row.status?.StatusHistory?.map(history => (
                    <div>{statusDescription(history.StatusCode)} <small>({history.User} - {new Date(history.timestamp).toLocaleDateString()})</small></div>
                ))}
            </div>
        </div>
    )
}

export default OrderStatusTooltipTitle;
