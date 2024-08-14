import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectImprint, selectLoading, selectMaxShipDate} from "../../ducks/orders/selectors";
import {loadOrders} from "../../ducks/orders/actions";
import {selectRefreshInterval} from "../../ducks/filters/selectors";
import classNames from "classnames";

const ReloadButton = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectLoading);
    const imprint = useSelector(selectImprint);
    const shipDate = useSelector(selectMaxShipDate);
    const [criteria, setCriteria] = useState({imprint, shipDate});
    const refreshInterval = useAppSelector(selectRefreshInterval);
    const refreshRef = useRef<number>(0);


    useEffect(() => {
        if (refreshInterval) {
            refreshRef.current = window.setTimeout(() => {
                dispatch(loadOrders());
            }, refreshInterval * 60 * 1000);
        }
        return () => {
            window.clearTimeout(refreshRef.current);
        }
    }, [refreshInterval, loading]);

    useEffect(() => {
        if (loading) {
            setCriteria({imprint, shipDate});
        }
    }, [loading]);

    const reloadHandler = () => {
        dispatch(loadOrders())
    }

    const changed = criteria.imprint !== imprint || criteria.shipDate !== shipDate;
    const buttonClassName = classNames(
        'btn btn-sm',
        {
            'btn-primary': !changed,
            'btn-warning': changed,
        }
    );

    return (
        <button className={buttonClassName} disabled={loading} onClick={reloadHandler}>
            Reload
        </button>
    )

}

export default ReloadButton;
