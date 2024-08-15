import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {selectEDITotals, selectShowEDI} from "../../ducks/orders/selectors";
import {toggleShowEDI} from "../../ducks/orders/actions";
import numeral from "numeral";
import {LocalStore} from "chums-components";
import {storageKeys} from "../../api/preferences";

export default function ShowEDICheckbox() {
    const dispatch = useAppDispatch();
    const checked = useAppSelector(selectShowEDI);
    const total = useAppSelector(selectEDITotals);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        LocalStore.setItem(storageKeys.showEDI, checked);
        dispatch(toggleShowEDI(ev.target.checked));
    }
    return (
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id={id} onChange={changeHandler} checked={checked}/>
            <label htmlFor={id} className="form-check-label">
                EDI ({numeral(total.count).format('0,0')})
            </label>
        </div>
    )
}
