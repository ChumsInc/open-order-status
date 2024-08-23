import React from 'react';
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Box, Stack} from "@mui/material";

export interface CheckedMenuItemProps extends MenuItemProps {
    checked?:boolean;
    colorCode?: string;
    count?: number;
    children: React.ReactNode;
}

const CheckedMenuItem = ({checked, colorCode, count, children, ...rest}:CheckedMenuItemProps) => {
    return (
        <MenuItem {...rest} selected={checked} autoFocus={checked}>
            {checked && (
                <ListItemIcon>
                    <span className="bi-check-lg" />
                </ListItemIcon>
            )}
            <ListItemText inset={!checked}>
                <Stack direction="row" alignItems="center">
                    <Box sx={{width: '10px', height: '10px', mr: 1}} className={`bg-${colorCode}`} />
                    <Box sx={{flex: '1 1 auto'}}>{children}</Box>
                    <Box>
                        {!!count && <span className="ms-1">({count})</span>}
                    </Box>
                </Stack>
            </ListItemText>
        </MenuItem>
    )
}

export default CheckedMenuItem;
