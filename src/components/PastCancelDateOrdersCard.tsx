import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {selectPastCancelDateOrders, selectTotals} from "../ducks/orders/selectors";
import {useAppDispatch} from "../app/configureStore";
import StatusCard from "./StatusCard";
import {GroupTotal} from "../types";
import {toggleShowPastCancelDate} from "../ducks/orders/actions";

export default function PastCancelDateOrdersCard() {
    const dispatch = useAppDispatch();
    const visible = useSelector(selectPastCancelDateOrders);
    const totals = useSelector(selectTotals);
    const [total, setTotal] = useState<GroupTotal | null>(totals?.pastCancelDate ?? null);

    useEffect(() => {
        setTotal(totals.pastCancelDate ?? null);
    }, [totals]);

    const visibilityToggle = (checked: boolean) => {
        dispatch(toggleShowPastCancelDate(checked));
    }

    return (
        <StatusCard title="Past Cancel" visibilityLabel="Show" titleClassName="text-danger"
                    sales={total?.value ?? 0}
                    count={total?.count ?? 0}
                    visible={visible} onToggleVisibility={visibilityToggle}/>
    )
}
