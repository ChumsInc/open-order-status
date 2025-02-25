import React, {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {useSelector} from "react-redux";
import {selectLoading} from "@/ducks/orders/selectors";
import {loadOrders} from "@/ducks/orders/actions";
import {selectRefreshInterval} from "@/ducks/filters/selectors";
import Button from "react-bootstrap/Button";

const ReloadButton = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectLoading);
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

    const reloadHandler = () => {
        dispatch(loadOrders())
    }

    return (
        <Button size="sm" variant="primary" disabled={loading} onClick={reloadHandler}>
            Reload
        </Button>
    )

}

ReloadButton.displayName = 'ReloadButton';
export default ReloadButton;
