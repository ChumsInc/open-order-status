import React, {ChangeEvent} from "react";
import FilterByDate from "./FilterByDate";
import ImprintToggle from "./ImprintToggle";
import ReloadButton from "./ReloadButton";
import {FormCheck} from "chums-components";
import GroupToggleLabel from "./GroupToggleLabel";
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectShowChums, selectShowEDI, selectShowWeb, selectTotals} from "../../ducks/orders/selectors";
import {SalesOrderStatusGroup} from "../../types";
import {toggleShowChums, toggleShowEDI, toggleShowWeb} from "../../ducks/orders/actions";

const OrderFiltersBar = () => {
    const dispatch = useAppDispatch();
    const totals = useSelector(selectTotals);
    const showChums = useSelector(selectShowChums);
    const showEDI = useSelector(selectShowEDI);
    const showWeb = useSelector(selectShowWeb);

    const changeHandler = (field: SalesOrderStatusGroup) => (ev: ChangeEvent<HTMLInputElement>) => {
        switch (field) {
            case 'chums':
                return dispatch(toggleShowChums(ev.target.checked));
            case 'edi':
                return dispatch(toggleShowEDI(ev.target.checked));
            case 'web':
                return dispatch(toggleShowWeb(ev.target.checked));
        }
    }
    return (
        <div className="row g-3 mb-3 align-items-baseline">
            <div className="col-auto">
                <ImprintToggle/>
            </div>
            <div className="col-auto">
                <FilterByDate/>
            </div>
            <div className="col-auto">
                <ReloadButton/>
            </div>
            <div className="col"/>
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

export default OrderFiltersBar
