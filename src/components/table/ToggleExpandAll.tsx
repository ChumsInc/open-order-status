import React, {MouseEvent} from "react";
import {useAppDispatch} from "../../app/configureStore";
import {toggleExpandAllGroups} from "../../ducks/orders/actions";
import {useSelector} from "react-redux";
import {selectAnyExpanded} from "../../ducks/orders/selectors";
import Tooltip from "@mui/material/Tooltip";

const ToggleExpandAll = () => {
    const dispatch = useAppDispatch();
    const isExpanded = useSelector(selectAnyExpanded);

    const changeHandler = (ev: MouseEvent) => {
        ev.stopPropagation();
        dispatch(toggleExpandAllGroups(!isExpanded));
    }

    return (
        <Tooltip title={isExpanded ? 'Collapse All' : 'Expand All'} arrow>
            <div onClick={changeHandler}>
                {!isExpanded && (<span className="ms-3 bi-caret-down-square" style={{cursor: 'pointer'}}/>)}
                {isExpanded && (<span className="ms-3 bi-caret-up-square" style={{cursor: 'pointer'}}/>)}
            </div>
        </Tooltip>
    )
}

export default ToggleExpandAll;
