import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectStatus} from "../../ducks/orders/selectors";
import OrderStatusSelect from "../../ducks/order-status/OrderStatusSelect";
import classNames from "classnames";
import {selectStatusByCode} from "../../ducks/order-status";
import {setStatusFilter} from "../../ducks/orders/actions";

const StatusFilter = () => {
    const dispatch = useAppDispatch();
    const statusCode = useSelector(selectStatus);
    const [currentStatus] = useSelector((state:RootState) => selectStatusByCode(state, statusCode ?? ''));
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const statusChangeHandler = (code: string | null) => {
        dispatch(setStatusFilter(code));
        setAnchorEl(null)
    }

    return (
        <div>
            <button className={classNames('btn btn-sm btn-outline-secondary')}
                    onClick={(ev) => setAnchorEl(ev.currentTarget)}>
                {(currentStatus?.StatusDescription ?? statusCode) || 'Filter by Status'}
            </button>
            <OrderStatusSelect value={statusCode ?? null} anchorEl={anchorEl}
                               onChange={statusChangeHandler} onClose={() => setAnchorEl(null)}/>
        </div>
    )
}

export default StatusFilter;
