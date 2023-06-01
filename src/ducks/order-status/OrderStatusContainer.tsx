import React, {useState} from 'react';
import {SalesOrderRow} from "../../types";
import classNames from "classnames";
import {RootState, useAppDispatch} from "../../app/configureStore";
import {selectList} from "./index";
import {useSelector} from "react-redux";
import OrderStatusSelect from "./OrderStatusSelect";
import {saveGroupStatus, saveOrderStatus} from "../orders/actions";
import {groupKey} from "../orders/utils";
import Tooltip from "@mui/material/Tooltip";
import OrderNoteModal from "./OrderNoteModal";
import {selectOrderGroup, selectSalesOrderNo} from "../orders/selectors";
import OrderStatusTooltipTitle from "./OrderStatusTooltipTitle";


const OrderStatusContainer = ({
                                  row,
                                  defaultText,
                              }: { row: SalesOrderRow, defaultText?: string }) => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectList);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [notesOpen, setNotesOpen] = useState(false);
    const group = useSelector((state: RootState) => selectOrderGroup(state, groupKey(row)));
    const salesOrderFilter = useSelector(selectSalesOrderNo);

    const [currentStatus] = list.filter(status => status.StatusCode === row.status?.StatusCode);
    const groupStatus = !!group && !group.expanded && group.salesOrders.length > 1 && !salesOrderFilter;
    const saving = groupStatus ? group?.saving : row.saving;

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        if (saving) {
            return;
        }
        setAnchorEl(ev.currentTarget);
    }


    const statusChangeHandler = (code: string | null) => {
        const key = groupKey(row);
        if (groupStatus) {
            dispatch(saveGroupStatus({
                id: 0,
                groupKey: key,
                SalesOrderNo: row.SalesOrderNo,
                StatusCode: code ?? '',
            }));
        } else if (row.status?.StatusCode !== code) {
            dispatch(saveOrderStatus({
                id: row.status?.id ?? 0,
                groupKey: key,
                SalesOrderNo: row.SalesOrderNo,
                StatusCode: code,
                Notes: row.status?.Notes ?? null
            }))
        }
        setAnchorEl(null);
    }
    const badgeClassName = () => {
        if (!row.status || !row.status.StatusCode) {
            return !!anchorEl ? 'btn-secondary' : 'btn-outline-secondary';
        }
        switch (row.status?.StatusCode) {
        case 'shipping':
        case 'ready':
            return 'btn-success';
        case 'credithold':
            return 'btn-danger';
        case 'creditcard':
        case 'approval':
        case 'woa':
        case 'wop':
        case 'swop':
            return 'btn-warning';
        case 'hurship':
        case 'picksheet':
            return 'btn-primary';
        default:
            return 'btn-secondary';
        }
    }
    // const badgeClassName = {
    //     'btn-primary': row.status?.StatusType === 'cs',
    //     'btn-info': row.status?.StatusType === 'imp' || !!anchorEl,
    //     'btn-success': row.status?.StatusType === 'shipping' && row.status.StatusCode !== 'swop',
    //     'btn-warning': row.status?.StatusCode === 'swop',
    //     'btn-outline-secondary': !row.status?.StatusCode && !anchorEl,
    // }
    const notesButtonClassName = {
        'btn-warning': !!row.status?.Notes,
        'btn-outline-secondary': !row.status?.Notes,
    }

    return (
        <div>
            <div className="btn-group btn-group-sm">
                <Tooltip title={<OrderStatusTooltipTitle row={row} currentStatus={currentStatus}/>} arrow placement="left">
                    <button className={classNames('btn btn-sm btn-status', badgeClassName())}
                            onClick={handleClick}>
                        {saving && (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Saving...</span>
                            </div>
                        )}
                        {!saving && (currentStatus?.StatusDescription || (defaultText ?? (groupStatus ? 'Set All' : 'Set Status')))}
                    </button>
                </Tooltip>
                <button className={classNames("btn btn-sm btn-status-comments", notesButtonClassName)}
                        disabled={saving}
                        onClick={() => setNotesOpen(true)}>
                    <span className="bi-pencil-fill"/>
                </button>
            </div>
            <OrderStatusSelect value={row.status?.StatusCode ?? null} anchorEl={anchorEl}
                               onChange={statusChangeHandler} onClose={() => setAnchorEl(null)}/>
            <OrderNoteModal row={row} open={notesOpen} onClose={() => setNotesOpen(false)} groupStatus={groupStatus}/>
        </div>
    )
}

export default OrderStatusContainer;
