import React from 'react';
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

export interface CheckedMenuItemProps extends MenuItemProps {
    checked?:boolean;
}
const CheckedMenuItem = ({checked, children, ...rest}:CheckedMenuItemProps) => {
    return (
        <MenuItem {...rest} selected={checked} autoFocus={checked}>
            {checked && (
                <ListItemIcon>
                    <span className="bi-check-lg" />
                </ListItemIcon>
            )}
            <ListItemText inset={!checked}>
                {children}
            </ListItemText>
        </MenuItem>
    )
}

export default CheckedMenuItem;
