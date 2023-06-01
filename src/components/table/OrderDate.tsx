import React from 'react';
import {SalesOrderRow} from "../../types";
import {friendlyDate, groupKey, parseDateTime} from "../../ducks/orders/utils";
import Tooltip from "@mui/material/Tooltip";
import {RootState, useAppSelector} from "../../app/configureStore";
import {selectOrderGroup} from "../../ducks/orders/selectors";

type DateRange = [Date, Date];

const dateFormat: Intl.DateTimeFormatOptions = {dateStyle: 'short'};
const timeFormat: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit'};

const dateRange = (date:Date, orders:SalesOrderRow[], field:'Created'|'Updated'):DateRange => {
    if (!orders.length) {
        return [date, date];
    }
    return orders.reduce((cv, order) => {
        const orderDateTS = parseDateTime(order[`Date${field}`], order[`Time${field}`]).valueOf();
        if (isNaN(orderDateTS)) {
            return cv;
        }
        const [min, max] = cv;
        return [new Date(Math.min(min.valueOf(), orderDateTS)), new Date(Math.max(max.valueOf(), orderDateTS))];
    }, [date, date]);
}

const OrderDateUser = ({title, user, date, maxDate}:{title: string, user:string, date:Date, maxDate?:Date|null}) => {
    const sameTime = 5 * 60 * 1000;
    if (isNaN(date.valueOf())) {
        return <div>{title}: {user}</div>
    }
    if (!maxDate || isNaN(maxDate.valueOf()) || Math.abs(maxDate.valueOf() - date.valueOf()) < sameTime) {
        return (
            <div>
                {title}: {' '}
                {date.toLocaleDateString(undefined, dateFormat)} {' @ '}
                {date.toLocaleTimeString(undefined, timeFormat)} by {user}
            </div>
        )
    }
    return (
        <div className="mb-1">
            <div>
                {title}: {' From '}
                {date.toLocaleDateString(undefined, dateFormat)} {' '}
                {date.toLocaleTimeString(undefined, timeFormat)}
            </div>
            <div>
                <span style={{visibility: 'hidden'}}>{title}:</span> {' To '}
                {maxDate.toLocaleDateString(undefined, dateFormat)} {' '}
                {maxDate.toLocaleTimeString(undefined, timeFormat)} by {user}
            </div>
        </div>
    )

}

const OrderDate = ({row}: { row: SalesOrderRow }) => {
    const key = groupKey(row);
    const group = useAppSelector((state: RootState) => selectOrderGroup(state, key));


    const renderTitle = () => {
        const orders = group?.salesOrders ?? [];
        const created = parseDateTime(row.DateCreated, row.TimeCreated);
        if (isNaN(created.valueOf())) {
            return null;
        }
        const updated = parseDateTime(row.DateUpdated, row.TimeUpdated);

        const [minCreated, maxCreated] = dateRange(created, group?.salesOrders ?? [], 'Created');
        const [minUpdated, maxUpdated] = dateRange(updated, orders, 'Updated');
        return (
            <div>
                <OrderDateUser title="Created" user={row.UserLogon} date={minCreated} maxDate={maxCreated} />
                <OrderDateUser title="Updated" user={row.UpdatedByUser} date={minUpdated} maxDate={maxUpdated} />
            </div>
        )
    }
    return (
        <Tooltip arrow title={renderTitle()} enterDelay={250}>
            <div>{friendlyDate(row.OrderDate)}</div>
        </Tooltip>
    )

}
export default OrderDate;
