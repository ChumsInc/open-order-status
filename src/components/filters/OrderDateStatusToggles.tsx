import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {
    selectBackOrders,
    selectInvoicing,
    selectLateOrders,
    selectOnCancelDateOrders,
    selectOnTime,
    selectPastCancelDateOrders,
    selectShowChums,
    selectShowDollars,
    selectShowEDI,
    selectShowWeb,
    selectTotals
} from "../../ducks/orders/selectors";
import {SalesOrderStatusGroup} from "../../types";
import {
    toggleShowBackorders,
    toggleShowChums,
    toggleShowDollars,
    toggleShowEDI,
    toggleShowInvoicing,
    toggleShowLate,
    toggleShowOnCancelDate,
    toggleShowOpen,
    toggleShowPastCancelDate,
    toggleShowWeb
} from "../../ducks/orders/actions";
import {FormCheck, ToggleButton} from "chums-components";
import GroupToggleLabel from "./GroupToggleLabel";

const OrderDateStatusToggles = () => {
    const dispatch = useAppDispatch();
    const dollars = useSelector(selectShowDollars);
    const openOrders = useSelector(selectOnTime);
    const late = useSelector(selectLateOrders);
    const backOrders = useSelector(selectBackOrders);
    const onCancelDate = useSelector(selectOnCancelDateOrders);
    const pastCancelDate = useSelector(selectPastCancelDateOrders);
    const invoicing = useSelector(selectInvoicing);
    const totals = useSelector(selectTotals);
    const showChums = useSelector(selectShowChums);
    const showEDI = useSelector(selectShowEDI);
    const showWeb = useSelector(selectShowWeb);

    const changeHandler = (field: SalesOrderStatusGroup) => (ev: ChangeEvent<HTMLInputElement>) => {
        switch (field) {
        case 'onTime':
            return dispatch(toggleShowOpen(ev.target.checked))
        case 'late':
            return dispatch(toggleShowLate(ev.target.checked))
        case 'backorder':
            return dispatch(toggleShowBackorders(ev.target.checked))
        case 'onCancelDate':
            return dispatch(toggleShowOnCancelDate(ev.target.checked))
        case 'pastCancelDate':
            return dispatch(toggleShowPastCancelDate(ev.target.checked))
        case 'invoicing':
            return dispatch(toggleShowInvoicing(ev.target.checked));
        case 'chums':
            return dispatch(toggleShowChums(ev.target.checked));
        case 'edi':
            return dispatch(toggleShowEDI(ev.target.checked));
        case 'web':
            return dispatch(toggleShowWeb(ev.target.checked));
        }
    }

    const changeShowDollars = (show: boolean) => dispatch(toggleShowDollars(show));

    return (
        <div className="row g-3 align-items-baseline">
            <div className="col-auto">
                <label className="me-3">Display</label>
                <FormCheck type={'radio'} inline label={'#'} checked={!dollars}
                           onChange={() => changeShowDollars(false)}/>
                <FormCheck type={'radio'} inline label={'$'} checked={dollars}
                           onChange={() => changeShowDollars(true)}/>
            </div>
            <div className="col-auto">
                <div className="btn-group btn-group-sm">
                    <ToggleButton checked={openOrders} onChange={changeHandler('onTime')} color="primary">
                        <GroupToggleLabel total={totals.onTime}>Open</GroupToggleLabel>
                    </ToggleButton>
                    <ToggleButton checked={late} onChange={changeHandler('late')} color="danger">
                        <GroupToggleLabel total={totals.late}>Late</GroupToggleLabel>
                    </ToggleButton>
                    <ToggleButton checked={backOrders} onChange={changeHandler('backorder')} color="dark">
                        <GroupToggleLabel total={totals.backorder}>Back Order</GroupToggleLabel>
                    </ToggleButton>
                    <ToggleButton checked={onCancelDate} onChange={changeHandler('onCancelDate')} color="warning">
                        <GroupToggleLabel total={totals.onCancelDate}>On Cancel Date</GroupToggleLabel>
                    </ToggleButton>
                    <ToggleButton checked={pastCancelDate} onChange={changeHandler('pastCancelDate')} color="danger">
                        <GroupToggleLabel total={totals.pastCancelDate}>Past Cancel <span className="bi-exclamation-triangle-fill"/></GroupToggleLabel>
                    </ToggleButton>
                    <ToggleButton checked={invoicing} onChange={changeHandler('invoicing')} color="success">
                        <GroupToggleLabel total={totals.invoicing}>Invoicing</GroupToggleLabel>
                    </ToggleButton>
                </div>
            </div>
            <div className="col-auto">
                <FormCheck type="checkbox" inline checked={showChums} onChange={changeHandler('chums')}>
                    <GroupToggleLabel total={totals.chums}>CHUMS</GroupToggleLabel>
                </FormCheck>
                <FormCheck type="checkbox" inline checked={showEDI} onChange={changeHandler('edi')}>
                    <GroupToggleLabel total={totals.edi}>EDI</GroupToggleLabel>
                </FormCheck>
                <FormCheck type="checkbox" inline checked={showWeb} onChange={changeHandler('web')}>
                    <GroupToggleLabel total={totals.web}>Web</GroupToggleLabel>
                </FormCheck>
            </div>
        </div>
    )
}

export default OrderDateStatusToggles;
