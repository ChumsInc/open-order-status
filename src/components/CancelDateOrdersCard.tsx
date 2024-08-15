import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {selectOnCancelDateOrders, selectTotals} from "../ducks/orders/selectors";
import {useAppDispatch} from "../app/configureStore";
import StatusCard from "./StatusCard";
import {GroupTotal} from "../types";
import {toggleShowOnCancelDate} from "../ducks/orders/actions";
import {LocalStore} from "chums-components";
import {storageKeys} from "../api/preferences";

export default function CancelDateOrdersCard() {
    const dispatch = useAppDispatch();
    const visible = useSelector(selectOnCancelDateOrders);
    const totals = useSelector(selectTotals);
    const [total, setTotal] = useState<GroupTotal | null>(totals?.onCancelDate ?? null);

    useEffect(() => {
        setTotal(totals.onCancelDate ?? null);
    }, [totals]);

    const visibilityToggle = (checked: boolean) => {
        LocalStore.setItem(storageKeys.showOnCancelDate, checked);
        dispatch(toggleShowOnCancelDate(checked));
    }

    return (
        <StatusCard title="On Cancel" visibilityLabel="Show" titleClassName="text-warning"
                    sales={total?.value ?? 0}
                    count={total?.count ?? 0}
                    visible={visible} onToggleVisibility={visibilityToggle}/>
    )
}
