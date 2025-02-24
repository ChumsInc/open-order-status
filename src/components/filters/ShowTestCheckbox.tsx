import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import {selectChumsTotals, selectShowChums, selectShowTest, selectTestTotals} from "_ducks/orders/selectors";
import {toggleShowChums, toggleShowTest} from "_ducks/orders/actions";
import {LocalStore} from "chums-components";
import {storageKeys} from "_src/api/preferences";
import ShowTotalCheckbox from "_components/filters/ShowTotalCheckbox";

function ShowChumsCheckbox() {
    const dispatch = useAppDispatch();
    const checked = useAppSelector(selectShowTest);
    const total = useAppSelector(selectTestTotals);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        LocalStore.setItem(storageKeys.showTest, checked);
        dispatch(toggleShowTest(ev.target.checked));
    }
    return (
        <ShowTotalCheckbox checked={checked} total={total} labelPrefix="01-TEST" onChange={changeHandler}/>
    )
}

ShowChumsCheckbox.displayName = 'ShowChumsCheckbox';
export default ShowChumsCheckbox
