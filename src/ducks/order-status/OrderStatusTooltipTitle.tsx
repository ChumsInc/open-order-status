import type {SalesOrderRow} from "../../types";
import {useSelector} from "react-redux";
import {selectStatusList} from "./index";
import dayjs from "dayjs";

const OrderStatusTooltipTitle = ({row}: {
    row: SalesOrderRow,
}) => {
    const list = useSelector(selectStatusList);

    if (Math.max(row.status?.statusHistory?.length ?? 0,  row.status?.StatusHistory?.length ?? 0) === 0) {
        return <span>Not Set</span>;
    }
    const statusDescription = (code: string) => {
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
    const localStatusDescription = (code: string, index: number) => {
        if (row.status?.statusHistory?.[index + 1]?.StatusCode === code) {
            return 'Notes Updated';
        }
        const [statusCode] = list.filter(sc => sc.StatusCode === code);
        return statusCode?.StatusDescription ?? 'Not Set'
    }
    if (row.status?.statusHistory?.length) {
        return (
            <div>
                {row.status?.statusHistory.map((history, index) => (
                    <div key={history.timestamp} className="flex flex-column mb-3">
                        <div>{localStatusDescription(history.StatusCode, index)}</div>
                        <div><small>{history.User} - {dayjs(history.timestamp).format('MM/DD/YYYY HH:mm')}</small></div>
                    </div>
                ))}
            </div>
        )
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
