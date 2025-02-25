import React from 'react';
import {SalesOrderRow} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {
    selectFilteredOrderNos,
    selectOrderGroup,
    selectRowsPerPage,
    selectSalesOrderNo,
    selectSort
} from "../../ducks/orders/selectors";
import {groupKey, orderSorter} from "../../ducks/orders/utils";
import {toggleExpandGroup} from "../../ducks/orders/actions";
import classNames from "classnames";
import Tooltip from "@mui/material/Tooltip";
import {VALUE_VARIES} from "@/utils/utils";

const SalesOrderToggle = ({row}: { row: SalesOrderRow }) => {
    const dispatch = useAppDispatch();
    const key = groupKey(row);
    const group = useAppSelector((state) => selectOrderGroup(state, key));
    const salesOrderNo = useSelector(selectSalesOrderNo);
    const orders = useSelector(selectFilteredOrderNos);
    const sort = useSelector(selectSort);
    const rowsPerPage = useSelector(selectRowsPerPage);

    const onToggleOpen = () => {
        if (row[sort.field] === VALUE_VARIES) {
            return;
        }
        dispatch(toggleExpandGroup({groupKey: key}))
    }

    if (!key || !group || group.count === 1) {
        return null;
    }
    if (salesOrderNo) {
        return null;
    }


    if (!group.expanded) {
        return (
            <Tooltip arrow title={row[sort.field] === VALUE_VARIES ? 'Unable to expand on current sort' : 'Expand group'}>
                <div onClick={onToggleOpen} style={{cursor: 'pointer'}} className="px-1">
                    <span className="ms-3 bi-caret-down-square"/>
                </div>
            </Tooltip>
        )
    }
    const [firstOrder] = [...group.salesOrders].sort(orderSorter(sort));
    const nextPage = Math.floor(orders.indexOf(firstOrder.SalesOrderNo) / rowsPerPage);
    const onToggleClose = () => {
        dispatch(toggleExpandGroup({groupKey: key, nextPage}))
    }

    const toggleClassName = {
        'bi-caret-up-square-fill': row.SalesOrderNo === firstOrder.SalesOrderNo,
        'bi-caret-up-square': row.SalesOrderNo !== firstOrder.SalesOrderNo,
        'opacity-50': row.SalesOrderNo !== firstOrder.SalesOrderNo
    }
    return (
        <Tooltip arrow title="Collapse group">
            <div onClick={onToggleClose} style={{cursor: 'pointer'}} className="px-1">
                <span className={classNames("ms-3", toggleClassName)}/>
            </div>
        </Tooltip>
    )
}

export default SalesOrderToggle
