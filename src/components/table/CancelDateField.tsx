import React from 'react';
import {SalesOrderRow} from "../../types";
import {friendlyDate} from "../../ducks/orders/utils";
import dayjs from "dayjs";

const CancelDateField = ({order}:{order:SalesOrderRow}) => {
    if (!order.CancelDate) {
        return null;
    }
    return (
        <>
            {friendlyDate(order.CancelDate)}
            {dayjs(order.CancelDate).isBefore(new Date(), 'day') && <span className="bi-exclamation-triangle-fill ms-1" /> }
        </>
    )
}
export default CancelDateField;
