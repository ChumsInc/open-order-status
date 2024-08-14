import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {selectShowWeb, selectWebTotals} from "../../ducks/orders/selectors";
import {toggleShowWeb} from "../../ducks/orders/actions";
import numeral from "numeral";

export default function ShowWebCheckbox() {
    const dispatch = useAppDispatch();
    const checked = useAppSelector(selectShowWeb);
    const total = useAppSelector(selectWebTotals);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleShowWeb(ev.target.checked));
    }
    return (
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id={id} onChange={changeHandler} checked={checked}/>
            <label htmlFor={id} className="form-check-label">
                Chums.com ({numeral(total.count).format('0,0')})
            </label>
        </div>
    )
}
