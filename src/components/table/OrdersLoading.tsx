import React from 'react';
import {useAppSelector} from "../../app/configureStore";
import {selectLoading} from "../../ducks/orders/selectors";
import {LinearProgress} from "@mui/material";

export default function OrdersLoading() {
    const loading = useAppSelector(selectLoading);

    return (
        <div className="my-1">
            {loading && (<LinearProgress variant="indeterminate" />)}
        </div>
    )
}
