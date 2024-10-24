import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {selectChumsTotals, selectShowChums} from "../../ducks/orders/selectors";
import {toggleShowChums} from "../../ducks/orders/actions";
import numeral from "numeral";
import {LocalStore} from "chums-components";
import {storageKeys} from "../../api/preferences";

export default function ShowChumsCheckbox() {
    const dispatch = useAppDispatch();
    const checked = useAppSelector(selectShowChums);
    const total = useAppSelector(selectChumsTotals);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        LocalStore.setItem(storageKeys.showChums, ev.target.checked);
        dispatch(toggleShowChums(ev.target.checked));
    }
    return (
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id={id} onChange={changeHandler} checked={checked}/>
            <label htmlFor={id} className="form-check-label">
                CHUMS ({numeral(total.count).format('0,0')})
            </label>
        </div>
    )
}
