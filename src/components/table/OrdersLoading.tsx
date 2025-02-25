import React from 'react';
import {useAppSelector} from "../../app/configureStore";
import {selectLoading} from "../../ducks/orders/selectors";
import {ProgressBar} from "react-bootstrap";

export default function OrdersLoading() {
    const loading = useAppSelector(selectLoading);

    return (
        <div className="my-1">
            {loading && (<ProgressBar animated striped now={100} style={{height: '5px'}}/>)}
        </div>
    )
}
