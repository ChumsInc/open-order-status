import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import ContextAlert from "@/components/alerts/ContextAlert";
import type {StyledErrorAlert} from "@/types/alerts";
import {dismissAlert, selectAlerts} from "@/ducks/alerts";
import {isFilterFunction} from "@/components/alerts/utils.ts";
import type {ErrorAlert} from "@chumsinc/ui-utils";


export type ContextFilterFunction = (alerts: StyledErrorAlert) => boolean;
export type ContextFilter = string | ContextFilterFunction;

export interface AlertListProps {
    contextFilter?: ContextFilter;
}

const AlertList = ({contextFilter}: AlertListProps) => {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectAlerts);

    const dismissHandler = (alert:ErrorAlert) => {
        dispatch(dismissAlert(alert));
    }

    return (
        <div>
            {list
                .filter(errorAlert => !contextFilter
                    || (
                        isFilterFunction(contextFilter)
                            ? contextFilter(errorAlert)
                            : errorAlert.context === contextFilter
                    ))
                .map(alert => (
                    <ContextAlert key={alert.id} variant={alert.variant} dismissible
                                  onClose={() => dismissHandler(alert)}
                                  context={alert.context} count={alert.count}>
                        {alert.message}
                    </ContextAlert>
                ))}
        </div>
    )
}
export default AlertList;
