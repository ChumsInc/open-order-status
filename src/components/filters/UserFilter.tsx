import React, {FormEvent, useEffect, useId, useState} from "react";
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectCustomer, selectUser} from "../../ducks/orders/selectors";
import {selectCustomerList, selectUserNames} from "../../ducks/filters";
import {setCustomerFilter, setUserFilter} from "../../ducks/orders/actions";
import classNames from "classnames";

const UserFilter = () => {
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);
    const list = useSelector(selectUserNames);
    const id = useId();
    const [value, setValue] = useState(user ?? '');


    useEffect(() => {
        setValue(user ?? '');
    }, [user]);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(setUserFilter(value));
    }
    const buttonClassName = {
        'btn-outline-secondary': !value && !user,
        'btn-secondary': !!value && value === user,
        'btn-warning': value !== user
    }

    return (
        <form onSubmit={submitHandler} className="input-group input-group-sm">
            <div className="input-group-text">
                <span className="bi-person-fill" />
            </div>
            <input type="search" value={value} onChange={(ev) => setValue(ev.target.value)}
                   list={id}
                   className="form-control form-control-sm"/>
            <datalist id={id}>
                {[...list].sort((a, b) => +a - +b)
                    .map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
            </datalist>
            <button type="submit" className={classNames('btn btn-sm', buttonClassName)} >
                <span className="bi-funnel-fill" />
            </button>
        </form>
    )
}

export default UserFilter;
