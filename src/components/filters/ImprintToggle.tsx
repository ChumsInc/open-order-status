import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectImprint, selectLoading} from "../../ducks/orders/selectors";
import {toggleImprint} from "../../ducks/orders/actions";

const ImprintToggle = () => {
    const dispatch = useAppDispatch();
    const imprint = useSelector(selectImprint);
    const loading = useSelector(selectLoading);
    const id = useId()

    const onChangeImprint = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleImprint(ev.target.checked));
    }

    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id={id} checked={imprint}
                   onChange={onChangeImprint} disabled={loading}/>
            <label className="form-check-label" htmlFor={id}>Only Imprint</label>
        </div>
    )
}

export default ImprintToggle;
