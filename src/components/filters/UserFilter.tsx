import React, {ChangeEvent, useId} from "react";
import {useAppDispatch} from "@/app/configureStore";
import {useSelector} from "react-redux";
import {selectUser} from "@/ducks/orders/selectors";
import {selectUserNames} from "@/ducks/filters/selectors";
import {setUserFilter} from "@/ducks/orders/actions";
import InputGroup from "react-bootstrap/InputGroup";
import FormSelect from "react-bootstrap/FormSelect";

const UserFilter = () => {
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);
    const list = useSelector(selectUserNames);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setUserFilter(ev.target.value));
    }
    return (
        <InputGroup className="input-group input-group-sm" style={{width: '100%'}}>
            <InputGroup.Text as="label" htmlFor={id}>
                <span className="bi-person-fill"/>
                <span className="visually-hidden">User</span>
            </InputGroup.Text>
            <FormSelect value={user ?? ''} onChange={changeHandler}>
                <option value="">All Users</option>
                {list.length > 0 && (<option disabled>---</option>)}
                {[...list].sort((a, b) => +a - +b)
                    .map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
            </FormSelect>
        </InputGroup>
    )
}

export default UserFilter;
