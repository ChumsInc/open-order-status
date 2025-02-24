import React from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {dismissAlert, selectAlerts} from "./index";
import ContextAlert from "./ContextAlert";

const AlertList = () => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectAlerts);

    return (
        <div>
            {list.map(alert => (
                <ContextAlert key={alert.id} context={alert.context} count={alert.count}
                              variant={alert.color ?? 'warning'}
                              dismissible onClose={() => dispatch(dismissAlert(alert.id))}>
                    {alert.message}
                </ContextAlert>
            ))}
        </div>
    )
}

export default AlertList;
