import React from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {dismissAlert, selectAlerts} from "./index";
import {ErrorAlert} from "chums-components";
import ContextAlert from "../../components/ContextAlert";

const AlertList = () => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectAlerts);

    const closeHandler = (alert:ErrorAlert) => {
        dispatch(dismissAlert(alert.id))
    }

    return (
        <div>
            {list.map(alert => (
                <ContextAlert key={alert.id} context={alert.context} count={alert.count} color={alert.color ?? 'warning'}
                       dismissible onClose={() => closeHandler(alert)}>
                    {alert.message}
                </ContextAlert>
            ))}
        </div>
    )
}

export default AlertList;
