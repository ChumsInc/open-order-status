import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../app/configureStore";
import dayjs from "dayjs";
import {setMaxShipDate} from "../../ducks/orders/actions";
import {useSelector} from "react-redux";
import {selectMaxShipDate} from "../../ducks/orders/selectors";

const FilterByDate = () => {
    const dispatch = useAppDispatch();
    const maxShipDate = useSelector(selectMaxShipDate);

    const onChangeDate = (ev:ChangeEvent<HTMLInputElement>) => {
        if (!ev.target.valueAsDate) {
            return;
        }
        const date = dayjs(ev.target.valueAsDate).add(new Date().getTimezoneOffset(), 'minute').toISOString();
        dispatch(setMaxShipDate(date));
    }

    return (
        <>
            <div className="input-group input-group-sm">
                <div className="input-group-text">
                    <span className="bi-calendar-range-fill" />
                </div>
                <input type="date" className="form-control form-control-sm"
                       value={dayjs(maxShipDate).format('YYYY-MM-DD')}
                       onChange={onChangeDate}
                       min={dayjs().format('YYYY-MM-DD')} list="max-ship-date-list" />
            </div>
            <datalist id="max-ship-date-list">
                <option value={dayjs().format('YYYY-MM-DD')}>Today</option>
                <option value={dayjs().add(2, 'weeks').format('YYYY-MM-DD')}>+2 Weeks</option>
                <option value={dayjs().add(4, 'weeks').format('YYYY-MM-DD')}>+4 Weeks</option>
            </datalist>
        </>
    )
}
export default FilterByDate
