import {useId} from 'react';
import numeral from "numeral";
import FormCheck, {type FormCheckProps} from "react-bootstrap/FormCheck";
import type {GroupTotal} from "@/src/types";

export interface ShowTotalCheckboxProps extends FormCheckProps {
    total: GroupTotal;
    labelPrefix: string;
}

function ShowTotalCheckbox({checked, total, labelPrefix, onChange, ...props}: ShowTotalCheckboxProps) {
    const componentId = useId();
    const id = props.id ?? componentId;
    return (
        <FormCheck inline checked={checked} onChange={onChange} id={id} {...props}
                   label={<span>{labelPrefix} ({numeral(total.count).format('0,0')})</span>}/>
    )
}

ShowTotalCheckbox.displayName = 'ShowTotalCheckbox';
export default ShowTotalCheckbox
