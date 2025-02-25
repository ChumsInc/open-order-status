import React, {useId} from 'react';
import numeral from "numeral";
import FormCheck, {FormCheckProps} from "react-bootstrap/FormCheck";
import {GroupTotal} from "@/src/types";

export interface ShowTotalCheckboxProps extends FormCheckProps {
    total: GroupTotal;
    labelPrefix: string;
}

function ShowTotalCheckbox({checked, total, labelPrefix, onChange, ...props}: ShowTotalCheckboxProps) {
    const id = props.id ?? useId();
    return (
        <FormCheck inline checked={checked} onChange={onChange} id={id} {...props}
                   label={<span>{labelPrefix} ({numeral(total.count).format('0,0')})</span>}/>
    )
}

ShowTotalCheckbox.displayName = 'ShowTotalCheckbox';
export default ShowTotalCheckbox
