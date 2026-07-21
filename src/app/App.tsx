import {useEffect, useMemo} from "react";
import AlertList from "@/components/alerts/AlertList";
import OrdersList from "@/components/table/OrdersList";
import OrderFiltersBar from "@/components/filters/OrderFiltersBar";
import OrderActionBar from "@/components/filters/OrderActionBar";
import {useAppDispatch} from "./configureStore";
import {loadStatusList} from "@/ducks/order-status";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StatusCards from "@/components/StatusCards";
import OrdersLoading from "@/components/table/OrdersLoading";
import {useDocumentColorScheme} from "@chumsinc/ui-utils";

export default function App() {
    const dispatch = useAppDispatch();
    const colorScheme = useDocumentColorScheme();

    useEffect(() => {
        dispatch(loadStatusList());
    }, [dispatch]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: colorScheme,
                },
            }),
        [colorScheme],
    );


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div id="oos--status-cards">
                <StatusCards/>
            </div>
            <div id="oos--orders-list" className="collapse show">
                <OrderActionBar/>
                <OrdersLoading/>
                <OrderFiltersBar/>
                <AlertList/>
                <OrdersList/>
            </div>
            <div className="row g-3">
                <div className="col-auto">
                    <span className="bi-person me-1"/> Created By User Name
                </div>
                <div className="col-auto">
                    <span className="bi-person-fill text-primary me-1"/> Updated By User Name
                </div>
            </div>
        </ThemeProvider>
    )
}

