import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import {selectEDITotals, selectShowEDI} from "_ducks/orders/selectors";
import {toggleShowEDI} from "_ducks/orders/actions";
import {LocalStore} from "chums-components";
import {storageKeys} from "_src/api/preferences";
import ShowTotalCheckbox from "_components/filters/ShowTotalCheckbox";

function ShowEDICheckbox() {
    const dispatch = useAppDispatch();
    const checked = useAppSelector(selectShowEDI);
    const total = useAppSelector(selectEDITotals);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        LocalStore.setItem(storageKeys.showEDI, ev.target.checked);
        dispatch(toggleShowEDI(ev.target.checked));
    }

    return (
        <ShowTotalCheckbox checked={checked} total={total} labelPrefix="EDI" onChange={changeHandler}/>
    )
}

ShowEDICheckbox.displayName = 'ShowEDICheckbox';
export default ShowEDICheckbox;
