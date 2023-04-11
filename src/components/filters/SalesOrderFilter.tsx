import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectSalesOrderNo} from "../../ducks/orders/selectors";
import {setSalesOrderFilter} from "../../ducks/orders/actions";

const SalesOrderFilter = () => {
    const dispatch = useAppDispatch();
    const salesOrderNo = useSelector(selectSalesOrderNo);

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setSalesOrderFilter(ev.target.value));
    }

    return (
        <div className="input-group input-group-sm">
            <div className="input-group-text" >SO#</div>
            <input type="search" className="form-control form-control-sm" value={salesOrderNo ?? ''} onChange={changeHandler} />
        </div>
    )
}
export default SalesOrderFilter;
