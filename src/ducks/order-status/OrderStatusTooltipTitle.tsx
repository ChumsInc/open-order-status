import React from 'react';
import {OpenOrderStatusCode, SalesOrderRow} from "../../types";
import {useSelector} from "react-redux";
import {selectStatusList} from "./index";
import dayjs from "dayjs";

const OrderStatusTooltipTitle = ({row, currentStatus}:{
    row:SalesOrderRow,
    currentStatus?: OpenOrderStatusCode
}) => {
    const list = useSelector(selectStatusList);

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
    if (!currentStatus) {
        return <div>Not Set</div>
    }
    return (
        <div>
            {row.status?.StatusHistory?.map(history => (
                <div key={history.timestamp} className="flex flex-column mb-3">
                    <div>{statusDescription(history.StatusCode)}</div>
                    <div><small>{history.User} - {dayjs(history.timestamp).format('MM/DD/YYYY HH:mm')}</small></div>
                </div>
            ))}
        </div>
    )
}

export default OrderStatusTooltipTitle;
