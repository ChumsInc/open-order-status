import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {selectLateOrders, selectTotals} from "../ducks/orders/selectors";
import {useAppDispatch} from "../app/configureStore";
import StatusCard from "./StatusCard";
import {GroupTotal} from "../types";
import {toggleShowLate} from "../ducks/orders/actions";

export default function LateOrdersCard() {
    const dispatch = useAppDispatch();
    const visible = useSelector(selectLateOrders);
    const totals = useSelector(selectTotals);
    const [total, setTotal] = useState<GroupTotal | null>(totals?.late ?? null);

    useEffect(() => {
        setTotal(totals.late ?? null);
    }, [totals]);

    const visibilityToggle = (checked: boolean) => {
        dispatch(toggleShowLate(checked));
    }

    return (
        <StatusCard title="Late Orders" visibilityLabel="Show" titleClassName="text-danger"
                    sales={total?.value ?? 0}
                    count={total?.count ?? 0}
                    visible={visible} onToggleVisibility={visibilityToggle}/>
    )
}
