import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "_app/configureStore";
import dayjs from "dayjs";
import {setLeadTime} from "_ducks/orders/actions";
import {selectLeadTime, selectLoading} from "_ducks/orders/selectors";
import {LocalStore} from "chums-components";
import {storageKeys} from "_src/api/preferences";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const FilterByDate = () => {
    const dispatch = useAppDispatch();
    const leadTime = useAppSelector(selectLeadTime);
    const loading = useAppSelector(selectLoading);
    const id = useId();
    const listId = useId();

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
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Ship Date</InputGroup.Text>
            <FormControl type="date" id={id}
                   value={dayjs().add(leadTime, 'days').format('YYYY-MM-DD')}
                   onChange={onChangeDate}
                   disabled={loading}
                   min={dayjs().format('YYYY-MM-DD')} list={listId}/>
            <datalist id={listId}>
                <option value={dayjs().format('YYYY-MM-DD')}>Today</option>
                <option value={dayjs().add(3, 'days').format('YYYY-MM-DD')}>+3 Days</option>
                <option value={dayjs().add(14, 'days').format('YYYY-MM-DD')}>+2 Weeks</option>
                <option value={dayjs().add(28, 'days').format('YYYY-MM-DD')}>+4 Weeks</option>
            </datalist>
        </InputGroup>
    )
}
export default FilterByDate
