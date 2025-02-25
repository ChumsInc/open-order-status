import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectEDITotals, selectShowEDI} from "@/ducks/orders/selectors";
import {toggleShowEDI} from "@/ducks/orders/actions";
import {LocalStore} from "@chumsinc/ui-utils";
import {storageKeys} from "@/api/preferences";
import ShowTotalCheckbox from "@/components/filters/ShowTotalCheckbox";

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
