import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import dayjs from "dayjs";
import {setLeadTime} from "../../ducks/orders/actions";
import {selectLeadTime, selectLoading} from "../../ducks/orders/selectors";
import {LocalStore} from "chums-components";
import {storageKeys} from "../../api/preferences";

const FilterByDate = () => {
    const dispatch = useAppDispatch();
    const leadTime = useAppSelector(selectLeadTime);
    const loading = useAppSelector(selectLoading);

    const onChangeDate = (ev: ChangeEvent<HTMLInputElement>) => {
        if (!ev.target.valueAsDate) {
            return;
        }
        const date = dayjs(ev.target.valueAsDate).add(new Date().getTimezoneOffset(), 'minute').toISOString();
        const leadTime = dayjs(date).endOf('day').diff(dayjs(), 'days');
        LocalStore.setItem(storageKeys.leadTime, leadTime);
        dispatch(setLeadTime(leadTime));
    }

    return (
        <div className="input-group input-group-sm">
            <div className="input-group-text">
                Ship Date
            </div>
            <input type="date" className="form-control form-control-sm"
                   value={dayjs().add(leadTime, 'days').format('YYYY-MM-DD')}
                   onChange={onChangeDate}
                   disabled={loading}
                   min={dayjs().format('YYYY-MM-DD')} list="max-ship-date-list"/>
            <datalist id="max-ship-date-list">
                <option value={dayjs().format('YYYY-MM-DD')}>Today</option>
                <option value={dayjs().add(3, 'days').format('YYYY-MM-DD')}>+3 Days</option>
                <option value={dayjs().add(14, 'days').format('YYYY-MM-DD')}>+2 Weeks</option>
                <option value={dayjs().add(28, 'days').format('YYYY-MM-DD')}>+4 Weeks</option>
            </datalist>
        </div>
    )
}
export default FilterByDate
