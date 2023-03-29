import React from 'react';
import {GroupTotal} from "../../types";
import {useSelector} from "react-redux";
import {selectShowDollars} from "../../ducks/orders/selectors";
import numeral from "numeral";

export interface GroupToggleLabelProps {
    total: GroupTotal;
    children: React.ReactNode;
}

const GroupToggleLabel = ({total, children}: GroupToggleLabelProps) => {
    const showDollars = useSelector(selectShowDollars);

    return (
        <span>
            {children} {' '}
            <small>
                {showDollars && (<>({numeral(total.value).format('$0,0')})</>)}
                {!showDollars && (<>({numeral(total.count).format('0,0')})</>)}
            </small>
        </span>
    )

}
export default GroupToggleLabel;
