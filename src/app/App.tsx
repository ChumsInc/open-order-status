import React, {useEffect} from "react";
import AlertList from "../ducks/alerts/AlertList";
import OrdersList from "../components/table/OrdersList";
import OrderFiltersBar from "../components/filters/OrderFiltersBar";
import OrderActionBar from "../components/filters/OrderActionBar";
import {useAppDispatch} from "./configureStore";
import {loadStatusList} from "../ducks/order-status";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from "@mui/material/useMediaQuery";
import StatusCards from "../components/StatusCards";
import OrdersLoading from "../components/table/OrdersLoading";

export default function App() {
    const dispatch = useAppDispatch();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        dispatch(loadStatusList());
    }, []);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                <StatusCards/>
                <OrderActionBar/>
                <OrdersLoading />
                <OrderFiltersBar/>
                <AlertList/>
                <OrdersList/>
            </div>
        </ThemeProvider>
    )
}

