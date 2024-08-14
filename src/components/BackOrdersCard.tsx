import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {selectBackOrders, selectTotals} from "../ducks/orders/selectors";
import {useAppDispatch} from "../app/configureStore";
import StatusCard from "./StatusCard";
import {GroupTotal} from "../types";
import {toggleShowBackorders} from "../ducks/orders/actions";

export default function BackOrdersCard() {
    const dispatch = useAppDispatch();
    const visible = useSelector(selectBackOrders);
    const totals = useSelector(selectTotals);
    const [total, setTotal] = useState<GroupTotal | null>(totals?.backorder ?? null);

    useEffect(() => {
        setTotal(totals.backorder ?? null);
    }, [totals]);

    const visibilityToggle = (checked: boolean) => {
        dispatch(toggleShowBackorders(checked));
    }

    return (
        <StatusCard title="Back Orders" visibilityLabel="Show" titleClassName="text-secondary"
                    sales={total?.value ?? 0}
                    count={total?.count ?? 0}
                    visible={visible} onToggleVisibility={visibilityToggle}/>
    )
}
