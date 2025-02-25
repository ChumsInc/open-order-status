import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectShowTest, selectTestTotals} from "@/ducks/orders/selectors";
import {toggleShowTest} from "@/ducks/orders/actions";
import {LocalStore} from "@chumsinc/ui-utils";
import {storageKeys} from "@/api/preferences";
import ShowTotalCheckbox from "@/components/filters/ShowTotalCheckbox";

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
