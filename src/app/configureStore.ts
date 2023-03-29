import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import alertsReducer from "../ducks/alerts";
import orderStatusReducer from "../ducks/order-status";
import ordersReducer from "../ducks/orders";
import filtersReducer from "../ducks/filters";



const rootReducer = combineReducers({
    alerts: alertsReducer,
    filters: filtersReducer,
    orders: ordersReducer,
    orderStatus: orderStatusReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
