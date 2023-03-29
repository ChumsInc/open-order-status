import React, {useEffect} from "react";
import AlertList from "../ducks/alerts/AlertList";
import OrdersList from "../components/table/OrdersList";
import OrderDateStatusToggles from "../components/filters/OrderDateStatusToggles";
import OrderFiltersBar from "../components/filters/OrderFiltersBar";
import {useAppDispatch} from "./configureStore";
import {loadStatusList} from "../ducks/order-status";

export default function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadStatusList());
    }, []);

    return (
        <div>
            <OrderFiltersBar />
            <OrderDateStatusToggles />
            <AlertList/>
            <OrdersList />
        </div>
    )
}

