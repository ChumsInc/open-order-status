import React from 'react';
import {SalesOrderRow} from "../../types";
import classNames from "classnames";

const statusClassName = ({OrderStatus, OrderType}: SalesOrderRow): string | null => {
    if (OrderType === 'B') {
        return 'text-bg-danger';
    }
    switch (OrderStatus) {
        case 'H':
            return 'text-bg-warning';
        case 'C':
            return 'text-secondary';
    }
    return null;
}

const OrderTypeBadge = ({row}: { row: SalesOrderRow }) => {
    const className = statusClassName(row);
    if (!className) {
        return null
    }
    return (
        <span className={classNames('badge', className)}>
            {row.OrderType}/{row.OrderStatus}
        </span>
    )
}

export default OrderTypeBadge;
