import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import {selectShowWeb, selectWebTotals} from "_ducks/orders/selectors";
import {toggleShowWeb} from "_ducks/orders/actions";
import {LocalStore} from "chums-components";
import {storageKeys} from "_src/api/preferences";
import ShowTotalCheckbox from "_components/filters/ShowTotalCheckbox";

function ShowWebCheckbox() {
    const dispatch = useAppDispatch();
    const checked = useAppSelector(selectShowWeb);
    const total = useAppSelector(selectWebTotals);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        LocalStore.setItem(storageKeys.showWeb, checked);
        dispatch(toggleShowWeb(ev.target.checked));
    }
    return (
        <ShowTotalCheckbox checked={checked} total={total} labelPrefix="Chums.com" onChange={changeHandler}/>
    )
}

ShowWebCheckbox.displayName = 'ShowWebCheckbox';
export default ShowWebCheckbox;
