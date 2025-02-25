import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {selectInvoicing, selectTotals} from "@/ducks/orders/selectors";
import {useAppDispatch} from "@/app/configureStore";
import StatusCard from "./StatusCard";
import {GroupTotal} from "../types";
import {toggleShowInvoicing} from "@/ducks/orders/actions";
import {LocalStore} from "@chumsinc/ui-utils";
import {storageKeys} from "@/api/preferences";

export default function InvoicingCard() {
    const dispatch = useAppDispatch();
    const visible = useSelector(selectInvoicing);
    const totals = useSelector(selectTotals);
    const [total, setTotal] = useState<GroupTotal | null>(totals?.invoicing ?? null);

    useEffect(() => {
        setTotal(totals.invoicing ?? null);
    }, [totals]);

    const visibilityToggle = (checked: boolean) => {
        LocalStore.setItem(storageKeys.showInvoicing, checked);
        dispatch(toggleShowInvoicing(checked));
    }

    return (
        <StatusCard title="Invoicing" visibilityLabel="Show" titleClassName="text-success"
                    sales={total?.value ?? 0}
                    count={total?.count ?? 0}
                    visible={visible} onToggleVisibility={visibilityToggle}/>
    )
}
