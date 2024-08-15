import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectImprint, selectLoading} from "../../ducks/orders/selectors";
import {toggleImprint} from "../../ducks/orders/actions";
import {LocalStore} from "chums-components";
import {storageKeys} from "../../api/preferences";

const imprintOrders = "imprint-orders";
const allOrders = "all-orders";

const ImprintToggle = () => {
    const dispatch = useAppDispatch();
    const imprint = useSelector(selectImprint);
    const loading = useSelector(selectLoading);
    const imprintId = useId()
    const allOrdersId = useId()

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const checked = ev.target.value === imprintOrders;
        LocalStore.setItem(storageKeys.imprint, checked);
        dispatch(toggleImprint(checked));
    }



    return (
        <div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio"
                       value={allOrders}
                       name="imprint-toggle" id={allOrdersId} checked={!imprint}
                       onChange={changeHandler}
                       disabled={loading}/>
                <label className="form-check-label" htmlFor={allOrdersId}>All Orders</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio"
                       value={imprintOrders} name="imprint-toggle" id={imprintId} checked={imprint}
                       onChange={changeHandler} disabled={loading}/>
                <label className="form-check-label" htmlFor={imprintId}>Imprint</label>
            </div>
        </div>
    )
}

export default ImprintToggle;
