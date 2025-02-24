import React, {ChangeEvent, useEffect} from "react";
import {useAppDispatch} from "_app/configureStore";
import {useSelector} from "react-redux";
import {selectARDivisionNo} from "_ducks/orders/selectors";
import {selectDivisionList} from "_ducks/filters/selectors";
import {loadDivisions} from "_ducks/filters/actions";
import {setARDivisionNoFilter} from "_ducks/orders/actions";
import FormSelect from "react-bootstrap/FormSelect";

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
        <FormSelect value={arDivisionNo ?? ''} onChange={changeHandler} size="sm">
            <option value="">All Divisions</option>
            <option value="" disabled></option>
            {Object.keys(list)
                .sort((a, b) => +a - +b)
                .map(key => (
                <option key={key} value={key}>{key} - {list[key]}</option>
            ))}
        </FormSelect>
    )
}

export default ARDivisionFilter;
