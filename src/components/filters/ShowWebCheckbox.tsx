import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectShowWeb, selectWebTotals} from "@/ducks/orders/selectors";
import {toggleShowWeb} from "@/ducks/orders/actions";
import {LocalStore} from "@chumsinc/ui-utils";
import {storageKeys} from "@/api/preferences";
import ShowTotalCheckbox from "@/components/filters/ShowTotalCheckbox";

function ShowWebCheckbox() {
    const dispatch = useAppDispatch();
    const checked = useAppSelector(selectShowWeb);
    const total = useAppSelector(selectWebTotals);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        LocalStore.setItem(storageKeys.showWeb, ev.target.checked);
        dispatch(toggleShowWeb(ev.target.checked));
    }

    return (
        <ShowTotalCheckbox checked={checked} total={total} labelPrefix="Chums.com" onChange={changeHandler}/>
    )
}

ShowWebCheckbox.displayName = 'ShowWebCheckbox';
export default ShowWebCheckbox;
