import React, {FormEvent, useEffect, useId, useState} from "react";
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectCustomer} from "../../ducks/orders/selectors";
import {selectCustomerList} from "../../ducks/filters";
import {setCustomerFilter} from "../../ducks/orders/actions";
import classNames from "classnames";

const CustomerFilter = () => {
    const dispatch = useAppDispatch();
    const customerNo = useSelector(selectCustomer);
    const list = useSelector(selectCustomerList);
    const id = useId();
    const [value, setValue] = useState(customerNo ?? '');


    useEffect(() => {
        setValue(customerNo ?? '');
    }, [customerNo]);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(setCustomerFilter(value));
    }

    const buttonClassName = {
        'btn-outline-secondary': !value && !customerNo,
        'btn-secondary': !!value && value === customerNo,
        'btn-warning': value !== customerNo
    }
    return (
        <form onSubmit={submitHandler} className="input-group input-group-sm">
            <div className="input-group-text">
                <span className="bi-shop-window" />
            </div>
            <input type="search" value={value} onChange={(ev) => setValue(ev.target.value)}
                   list={id}
                   className="form-control form-control-sm"/>
            <datalist id={id}>
                {Object.keys(list)
                    .sort((a, b) => +a - +b)
                    .map(key => (
                        <option key={key} value={key}>{key} - {list[key]}</option>
                    ))}
            </datalist>
            <button type="submit" className={classNames('btn btn-sm', buttonClassName)} >
                <span className="bi-funnel-fill" />
            </button>
        </form>
    )
}

export default CustomerFilter;
