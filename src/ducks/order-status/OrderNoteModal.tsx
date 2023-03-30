import React, {useState} from "react";
import {SalesOrderRow} from "../../types";
import {useAppDispatch} from "../../app/configureStore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {saveGroupStatus, saveOrderStatus} from "../orders/actions";
import {groupKey} from "../orders/utils";
import DialogContent from "@mui/material/DialogContent";

const OrderNoteModal = ({row, open, onClose, groupStatus}: { row: SalesOrderRow, open: boolean, onClose: () => void; groupStatus?: boolean}) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(row.status?.Notes ?? '');
    const saveHandler = () => {
        if (groupStatus) {
            dispatch(saveGroupStatus({
                id: 0,
                groupKey: groupKey(row),
                SalesOrderNo: row.SalesOrderNo,
                Notes: value,
            }));
        } else if (value !== (row.status?.Notes ?? '')) {
            dispatch(saveOrderStatus({
                id: row.status?.id ?? 0,
                SalesOrderNo: row.SalesOrderNo,
                groupKey: groupKey(row),
                Notes: value.trim(),
                StatusCode: row.status?.StatusCode ?? null,
            }))
        }
        onClose();
    }
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                Add comment to #{row.SalesOrderNo} {groupStatus && <span>Group</span>}
            </DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" label="Order Status Notes" multiline value={value} variant="filled"
                           fullWidth
                           onChange={(ev) => setValue(ev.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={saveHandler}>
                    Save {groupStatus ? ' All' : ''}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderNoteModal;
