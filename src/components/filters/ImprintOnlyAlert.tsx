import React from 'react';
import {useSelector} from "react-redux";
import {selectImprint} from "../../ducks/orders/selectors";
import {Alert} from "chums-components";

export default function ImprintOnlyAlert() {
    const imprint = useSelector(selectImprint);
    if (!imprint) {
        return null;
    }
    return (
        <Alert color="info"><strong className="me-3">Note</strong> Only imprint orders selected.</Alert>
    )
}
