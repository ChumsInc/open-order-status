import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import {selectRefreshInterval} from "_ducks/filters/selectors";
import {setRefreshInterval} from "_ducks/filters/actions";
import {InputGroup} from "react-bootstrap";
import FormSelect from "react-bootstrap/FormSelect";

export default function AutoRefreshInterval() {
    const dispatch = useAppDispatch();
    const interval = useAppSelector(selectRefreshInterval);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        const interval = isNaN(Number(ev.target.value)) ? 0 : Number(ev.target.value);
        dispatch(setRefreshInterval(interval ?? 0));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>
                <span className="bi-stopwatch me-1"/>
                Refresh
            </InputGroup.Text>
            <FormSelect value={interval ?? 0} onChange={changeHandler} id={id}>
                <option value={0}>Off</option>
                <option value={10}>10 Minutes</option>
                <option value={60}>60 Minutes</option>
            </FormSelect>
        </InputGroup>
    )
}
