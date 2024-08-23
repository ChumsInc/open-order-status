import React from 'react';
import {useSelector} from "react-redux";
import {groupTitle, selectStatusList} from "./index";
import Menu from "@mui/material/Menu";
import ListSubheader from "@mui/material/ListSubheader";
import CheckedMenuItem from "./CheckedMenuItem";
import {useAppSelector} from "../../app/configureStore";
import {selectStatusCounts} from "../orders/selectors";
import {OpenOrderStatusGroup} from "../../types";


const orderStatusGroups: OpenOrderStatusGroup[] = ['cs', 'imp', 'shipping'];

export interface OrderStatusSelectProps {
    value: string | null,
    anchorEl: HTMLElement | null,
    onChange: (value: string | null) => void;
    onClose: () => void;
}

const OrderStatusSelect = ({value, onChange, anchorEl, onClose}: OrderStatusSelectProps) => {
    const list = useSelector(selectStatusList);
    const counts = useAppSelector(selectStatusCounts);


    return (
        <Menu open={!!anchorEl} onClose={onClose} sx={{maxHeight: '75vh'}}
              anchorEl={anchorEl} MenuListProps={{dense: true}}>
            <CheckedMenuItem onClick={() => onChange(null)} checked={!value}>
                Clear Status
            </CheckedMenuItem>
            {orderStatusGroups.map(groupId => (
                <div key={groupId}>
                    <ListSubheader>{groupTitle(groupId)}</ListSubheader>
                    {list.filter(item => item.StatusType === groupId).map(item => (
                        <CheckedMenuItem key={item.id} onClick={() => onChange(item.StatusCode)}
                                         count={counts[item.StatusCode]}
                                         colorCode={item.colorCode}
                                         checked={value === item.StatusCode}>
                            {item.StatusDescription}
                        </CheckedMenuItem>
                    ))}
                </div>
            ))}
        </Menu>
    )
}

export default OrderStatusSelect;
