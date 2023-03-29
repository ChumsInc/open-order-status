import React, {ChangeEvent, useEffect} from "react";
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectARDivisionNo} from "../../ducks/orders/selectors";
import {loadDivisions, selectDivisionList} from "../../ducks/filters";
import {setARDivisionNoFilter} from "../../ducks/orders/actions";

const ARDivisionFilter = () => {
    const dispatch = useAppDispatch();
    const arDivisionNo = useSelector(selectARDivisionNo);
    const list = useSelector(selectDivisionList);

    useEffect(() => {
        dispatch(loadDivisions())
    }, [])

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setARDivisionNoFilter(ev.target.value ?? ''));
    }

    return (
        <select value={arDivisionNo ?? ''} onChange={changeHandler} className="form-select form-select-sm">
            <option value="">All Divisions</option>
            <option value="" disabled></option>
            {Object.keys(list)
                .sort((a, b) => +a - +b)
                .map(key => (
                <option key={key} value={key}>{key} - {list[key]}</option>
            ))}
        </select>
    )
}

export default ARDivisionFilter;
