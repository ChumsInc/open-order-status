import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectStatusFilter} from "../../ducks/orders/selectors";
import OrderStatusSelect from "../../ducks/order-status/OrderStatusSelect";
import classNames from "classnames";
import {selectStatusByCode, selectStatusList} from "../../ducks/order-status";
import {setStatusFilter} from "../../ducks/orders/actions";
import {OpenOrderStatusCode} from "../../types";
import {statusButtonClassName} from "../../ducks/order-status/utils";

const StatusFilter = () => {
    const dispatch = useAppDispatch();
    const statusCode = useSelector(selectStatusFilter);
    const list = useAppSelector(selectStatusList)
    const currentStatus = useAppSelector(state => selectStatusByCode(state, statusCode));
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [current, setCurrent] = useState<OpenOrderStatusCode | null>(null);

    useEffect(() => {
        const [current] = list.filter(sc => sc.StatusCode === statusCode);
        setCurrent(current ?? null);
    }, [statusCode, list]);

    const statusChangeHandler = (code: string | null) => {
        dispatch(setStatusFilter(code));
        setAnchorEl(null)
    }

    const clearStatusHandler = () => {
        dispatch(setStatusFilter(null));
    }

    return (
        <div>
            <div className="btn-group btn-group-sm">
                <button className={classNames(
                    'btn',
                    statusButtonClassName({statusCode: current?.StatusCode, colorCode: current?.colorCode}))}
                        onClick={(ev) => setAnchorEl(ev.currentTarget)}>
                    {(currentStatus?.StatusDescription ?? statusCode) || 'Filter by Status'}
                </button>
                <button className="btn btn-outline-secondary" aria-label="Clear Status Filter"
                        disabled={!current}
                        onClick={clearStatusHandler}>
                    <span className="btn-close" />
                </button>
            </div>
            <OrderStatusSelect value={statusCode ?? null} anchorEl={anchorEl}
                               onChange={statusChangeHandler} onClose={() => setAnchorEl(null)}/>
        </div>
    )
}

export default StatusFilter;
