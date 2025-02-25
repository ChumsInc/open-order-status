import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "@/app/configureStore";
import {useSelector} from "react-redux";
import {selectImprint, selectLoading} from "@/ducks/orders/selectors";
import {toggleImprint} from "@/ducks/orders/actions";
import {LocalStore} from "@chumsinc/ui-utils";
import {storageKeys} from "@/api/preferences";
import FormCheck from "react-bootstrap/FormCheck";

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
            <FormCheck inline id={allOrdersId} onChange={changeHandler} type="radio" name="imprint-toggle" value={allOrders}
                       label="All Orders" checked={!imprint} disabled={loading}/>
            <FormCheck inline id={imprintId} onChange={changeHandler} type="radio" name="imprint-toggle"
                       value={imprintOrders} label="Imprint" disabled={loading}
                       checked={imprint}/>
        </div>
    )
}

export default ImprintToggle;
