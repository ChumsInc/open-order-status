import React from 'react';
import {useSelector} from "react-redux";
import {groupTitle, selectList} from "./index";
import Menu from "@mui/material/Menu";
import ListSubheader from "@mui/material/ListSubheader";
import CheckedMenuItem from "./CheckedMenuItem";
import {Box, Stack} from "@mui/material";


export interface OrderStatusSelectProps {
    value: string | null,
    anchorEl: HTMLElement | null,
    onChange: (value: string | null) => void;
    onClose: () => void;
}

const OrderStatusSelect = ({value, onChange, anchorEl, onClose}: OrderStatusSelectProps) => {
    const list = useSelector(selectList);

    return (
        <Menu open={!!anchorEl} onClose={onClose} PaperProps={{style: {maxHeight: '75vh'}}}
              anchorEl={anchorEl} MenuListProps={{dense: true}}>
            <CheckedMenuItem onClick={() => onChange(null)} checked={!value}>
                Clear Status
            </CheckedMenuItem>
            <ListSubheader>{groupTitle('cs')}</ListSubheader>
            {list.filter(item => item.StatusType === 'cs').map(item => (
                <CheckedMenuItem key={item.id} onClick={() => onChange(item.StatusCode)}
                                 colorCode={item.colorCode}
                                 checked={value === item.StatusCode}>
                    {item.StatusDescription}                </CheckedMenuItem>
            ))}
            <ListSubheader>{groupTitle('imp')}</ListSubheader>
            {list.filter(item => item.StatusType === 'imp').map(item => (
                <CheckedMenuItem key={item.id} onClick={() => onChange(item.StatusCode)}
                                 colorCode={item.colorCode}
                                 checked={value === item.StatusCode}>
                    {item.StatusDescription}
                </CheckedMenuItem>
            ))}
            <ListSubheader>{groupTitle('shipping')}</ListSubheader>
            {list.filter(item => item.StatusType === 'shipping').map(item => (
                <CheckedMenuItem key={item.id} onClick={() => onChange(item.StatusCode)}
                                 colorCode={item.colorCode}
                                 checked={value === item.StatusCode}>
                    {item.StatusDescription}
                </CheckedMenuItem>
            ))}
        </Menu>
    )
}

export default OrderStatusSelect;
