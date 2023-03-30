import React from 'react';
import {SalesOrderRow} from "../../types";
import classNames from "classnames";

const statusClassName = ({OrderStatus, OrderType}:SalesOrderRow) => {
    switch (OrderType) {
    case 'B':
        return {'bg-danger': true};
    }
    switch (OrderStatus) {
    case 'O':
    case 'N':
        return {'bg-light': true, 'text-dark': true,};
    case 'H':
        return {'bg-warning': true, "text-dark": true};
    }
    return {};
}

const OrderTypeBadge = ({row}:{row:SalesOrderRow}) => {
    return <span className={classNames('badge', statusClassName(row))}>
        {row.OrderType}/{row.OrderStatus}
    </span>
}

export default OrderTypeBadge;
