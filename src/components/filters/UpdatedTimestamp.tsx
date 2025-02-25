import React from 'react';
import {useAppSelector} from "@/app/configureStore";
import {selectOrdersUpdated} from "@/ducks/orders/selectors";

export default function UpdatedTimestamp() {
    const updated = useAppSelector(selectOrdersUpdated);

    return (
        <div>
            {!!updated && (
                <span className="text-secondary">
                    <span className="me-3">Last Updated:</span>
                    <span className="text-secondary-emphasis">{new Date(updated).toLocaleTimeString()}</span>
                </span>
            )}
        </div>
    )
}
