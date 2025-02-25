import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import alertsReducer from "../ducks/alerts";
import orderStatusReducer from "../ducks/order-status";
import ordersReducer from "../ducks/orders";
import filtersReducer from "../ducks/filters";
import versionReducer from "../ducks/version";
import appReducer from "../ducks/app";



const rootReducer = combineReducers({
    alerts: alertsReducer,
    app: appReducer,
    filters: filtersReducer,
    orders: ordersReducer,
    orderStatus: orderStatusReducer,
    version: versionReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
