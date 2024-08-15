import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {selectRefreshInterval} from "../../ducks/filters/selectors";
import {setRefreshInterval} from "../../ducks/filters/actions";

export default function AutoRefreshInterval() {
    const dispatch = useAppDispatch();
    const interval = useAppSelector(selectRefreshInterval);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        const interval = isNaN(Number(ev.target.value)) ? 0 : Number(ev.target.value);
        dispatch(setRefreshInterval(interval ?? 0));
    }

    return (
        <div className="input-group input-group-sm">
            <label className="input-group-text" htmlFor={id}>
                <span className="bi-stopwatch me-1"/>
                Refresh
            </label>
            <select value={interval ?? 0} onChange={changeHandler} id={id} className="form-select">
                <option value={0}>Off</option>
                <option value={10}>10 Minutes</option>
                <option value={60}>60 Minutes</option>
            </select>
        </div>
    )
}
