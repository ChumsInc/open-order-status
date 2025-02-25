import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "@/app/configureStore";
import {useSelector} from "react-redux";
import {selectSalesOrderNo} from "@/ducks/orders/selectors";
import {setSalesOrderFilter} from "@/ducks/orders/actions";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const SalesOrderFilter = () => {
    const dispatch = useAppDispatch();
    const salesOrderNo = useSelector(selectSalesOrderNo);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setSalesOrderFilter(ev.target.value));
    }

    return (
        <InputGroup size="sm" className="input-group input-group-sm">
            <InputGroup.Text as="label" htmlFor={id}>SO#</InputGroup.Text>
            <FormControl type="search" size="sm" id={id} value={salesOrderNo ?? ''} onChange={changeHandler} />
        </InputGroup>
    )
}
SalesOrderFilter.displayName = 'SalesOrderFilter';
export default SalesOrderFilter;
