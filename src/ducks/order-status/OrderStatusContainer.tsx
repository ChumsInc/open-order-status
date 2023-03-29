import React, {useState} from 'react';
import {SalesOrderRow, SalesOrderStatusData} from "../../types";
import classNames from "classnames";
import {RootState, useAppDispatch} from "../../app/configureStore";
import {selectList} from "./index";
import {useSelector} from "react-redux";
import OrderStatusSelect from "./OrderStatusSelect";
import {saveOrderStatus} from "../orders/actions";
import {groupKey} from "../orders/utils";
import Tooltip from "@mui/material/Tooltip";
import OrderNoteModal from "./OrderNoteModal";
import {selectOrderGroup} from "../orders/selectors";


const OrderStatusContainer = ({
                                  row,
                                  defaultText
                              }: { row: SalesOrderRow, defaultText?: string, allowComment?: boolean }) => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectList);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [notesOpen, setNotesOpen] = useState(false);
    const group = useSelector((state:RootState) => selectOrderGroup(state, groupKey(row)));

    const [currentStatus] = list.filter(status => status.StatusCode === row.status?.StatusCode);
    const disabled = row.saving || (group.count > 1 && !group.expanded);

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(ev.currentTarget);
    }

    const statusChangeHandler = (code: string | null) => {
        if (row.status?.StatusCode !== code) {
            const arg: SalesOrderStatusData = {
                id: row.status?.id ?? 0,
                groupKey: groupKey(row),
                SalesOrderNo: row.SalesOrderNo,
                StatusCode: code,
                Notes: row.status?.Notes ?? null
            }
            dispatch(saveOrderStatus(arg))
        }
        setAnchorEl(null);
    }

    const badgeClassName = {
        'btn-primary': row.status?.StatusType === 'cs',
        'btn-info': row.status?.StatusType === 'imp' || !!anchorEl,
        'btn-success': row.status?.StatusType === 'shipping' && row.status.StatusCode !== 'swop',
        'btn-warning': row.status?.StatusCode === 'swop',
        'btn-outline-secondary': !row.status?.StatusCode && !anchorEl,
    }
    const notesButtonClassName = {
        'btn-warning': !!row.status?.Notes,
        'btn-outline-secondary': !row.status?.Notes,
    }

    return (
        <div>
            <div className="btn-group btn-group-sm">
                <Tooltip title={currentStatus?.StatusDescription ?? undefined} arrow placement="left">
                    <button className={classNames('btn btn-sm btn-status', badgeClassName)}
                            onClick={handleClick} disabled={disabled}>
                        {row.saving && (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Saving...</span>
                            </div>
                        )}
                        {!row.saving && (row.status?.StatusCode || (defaultText ?? 'Set Status'))}
                    </button>
                </Tooltip>
                <button className={classNames("btn btn-sm btn-status-comments", notesButtonClassName)}
                        disabled={disabled}
                        onClick={() => setNotesOpen(true)}>
                    <span className="bi-pencil-fill"/>
                </button>
            </div>
            <OrderStatusSelect value={row.status?.StatusCode ?? null} anchorEl={anchorEl}
                               onChange={statusChangeHandler} onClose={() => setAnchorEl(null)}/>
            <OrderNoteModal row={row} open={notesOpen} onClose={() => setNotesOpen(false)}/>
        </div>
    )
}

export default OrderStatusContainer;
