import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {selectOnTime, selectTotals} from "../ducks/orders/selectors";
import {useAppDispatch} from "../app/configureStore";
import StatusCard from "./StatusCard";
import {GroupTotal} from "../types";
import {toggleShowOpen} from "../ducks/orders/actions";
import {LocalStore} from "chums-components";
import {storageKeys} from "../api/preferences";

export default function OnTimeCard() {
    const dispatch = useAppDispatch();
    const showOnTime = useSelector(selectOnTime);
    const totals = useSelector(selectTotals);
    const [onTime, setOnTime] = useState<GroupTotal|null>(totals?.onTime ?? null);

    useEffect(() => {
        setOnTime(totals.onTime ?? null);
    }, [totals]);

    const visibilityToggle = (checked:boolean) => {
        LocalStore.setItem(storageKeys.showOpen, checked);
        dispatch(toggleShowOpen(checked));
    }

    return (
        <StatusCard title="Open Orders" visibilityLabel="Show"
                    sales={onTime?.value ?? 0}
                    count={onTime?.count ?? 0}
                    visible={showOnTime} onToggleVisibility={visibilityToggle} />
    )
}
