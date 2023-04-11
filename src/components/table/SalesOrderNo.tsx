import React from 'react';
import {SalesOrderRow} from "../../types";
import {groupKey} from "../../ducks/orders/utils";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch, useAppSelector} from "../../app/configureStore";
import {selectOrderGroup, selectSalesOrderNo, selectSort} from "../../ducks/orders/selectors";
import SalesOrderLink from "./SalesOrderLink";
import SalesOrderNoRange from "./SalesOrderNoRange";
import {toggleExpandGroup} from "../../ducks/orders/actions";
import {VALUE_VARIES} from "../../utils";

const SalesOrderNo = ({row}:{row: SalesOrderRow}) => {
    const dispatch = useAppDispatch();
    const key = groupKey(row);
    const group = useAppSelector((state: RootState) => selectOrderGroup(state, key));
    const sort = useAppSelector(selectSort);
    const salesOrderFilter = useAppSelector(selectSalesOrderNo);

    const clickHandler = () => {
        if (row[sort.field] === VALUE_VARIES) {
            return;
        }
        dispatch(toggleExpandGroup({groupKey: key}));
    }
    if (!key) {
        return null;
    }
    if (group?.expanded || group?.count === 1 || !!salesOrderFilter) {
        return (
            <SalesOrderLink salesOrderNo={row.SalesOrderNo}/>
        )
    }
    return (
        <SalesOrderNoRange salesOrderNos={group?.salesOrders.map(row => row.SalesOrderNo) ?? []} onClick={clickHandler}/>
    )
}
export default SalesOrderNo;
