import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectImprint, selectLoading, selectMaxShipDate} from "../../ducks/orders/selectors";
import {SpinnerButton} from "chums-components";
import {loadOrders} from "../../ducks/orders/actions";

const ReloadButton = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectLoading);
    const imprint = useSelector(selectImprint);
    const shipDate = useSelector(selectMaxShipDate);
    const [criteria, setCriteria] = useState({imprint, shipDate});

    useEffect(() => {
        if (loading) {
            setCriteria({imprint, shipDate});
        }
    }, [loading]);

    const reloadHandler = () => {
        dispatch(loadOrders())
    }

    const changed = criteria.imprint !== imprint || criteria.shipDate !== shipDate;

    return (
        <SpinnerButton size="sm" color={changed ? 'warning' : 'primary'} spinning={loading} onClick={reloadHandler}>
            Reload
        </SpinnerButton>
    )

}

export default ReloadButton;
