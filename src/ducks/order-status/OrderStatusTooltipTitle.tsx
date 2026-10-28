import type {SalesOrderRow} from "../../types";
import {useSelector} from "react-redux";
import {selectStatusList} from "./index";
import dayjs from "dayjs";

const OrderStatusTooltipTitle = ({row}: {
    row: SalesOrderRow,
}) => {
    const list = useSelector(selectStatusList);

    if (!row.status?.statusHistory?.length) {
        return <span>Not Set</span>;
    }

    const localStatusDescription = (code: string, index: number) => {
        if (row.status?.statusHistory?.[index + 1]?.StatusCode === code) {
            return 'Notes Updated';
        }
        const [statusCode] = list.filter(sc => sc.StatusCode === code);
        return statusCode?.StatusDescription ?? 'Not Set'
    }

    return (
        <div>
            {[...(row.status?.statusHistory ?? [])]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((history, index) => (
                <div key={history.timestamp} className="flex flex-column mb-3">
                    <div>{localStatusDescription(history.StatusCode, index)}</div>
                    <div><small>{history.User} - {dayjs(history.timestamp).format('MM/DD/YYYY HH:mm')}</small></div>
                </div>
            ))}
        </div>
    )
}

export default OrderStatusTooltipTitle;
