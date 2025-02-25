import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import {selectChumsTotals, selectShowChums} from "_ducks/orders/selectors";
import {toggleShowChums} from "_ducks/orders/actions";
import {LocalStore} from "chums-components";
import {storageKeys} from "_src/api/preferences";
import ShowTotalCheckbox from "_components/filters/ShowTotalCheckbox";

function ShowChumsCheckbox() {
    const dispatch = useAppDispatch();
    const checked = useAppSelector(selectShowChums);
    const total = useAppSelector(selectChumsTotals);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        LocalStore.setItem(storageKeys.showChums, ev.target.checked);
        dispatch(toggleShowChums(ev.target.checked));
    }
    return (
        <ShowTotalCheckbox checked={checked} total={total} labelPrefix="CHUMS" onChange={changeHandler}/>
    )
}

ShowChumsCheckbox.displayName = 'ShowChumsCheckbox';
export default ShowChumsCheckbox
