import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectChumsTotals, selectShowChums} from "@/ducks/orders/selectors";
import {toggleShowChums} from "@/ducks/orders/actions";
import {LocalStore} from "@chumsinc/ui-utils";
import {storageKeys} from "@/api/preferences";
import ShowTotalCheckbox from "@/components/filters/ShowTotalCheckbox";

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
