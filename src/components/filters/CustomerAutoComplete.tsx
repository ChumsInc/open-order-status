import React, {useEffect, useState} from 'react';
import {customerKey} from "../../utils";
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {selectFilteredCustomers} from "../../ducks/filters/selectors";
import {useSelector} from "react-redux";
import {selectCustomer} from "../../ducks/orders/selectors";
import {Autocomplete, Box, Stack} from "@mui/material";
import {BasicCustomer} from "../../types";
import {setCustomerFilter} from "../../ducks/orders/actions";
import {Popper, PopperProps} from "@mui/base";

export default React.forwardRef(function CustomerAutoComplete() {
    const dispatch = useAppDispatch();
    const customers = useAppSelector(selectFilteredCustomers);
    const customer = useSelector(selectCustomer);
    const [inputValue, setInputValue] = useState<string>(customer ? customerKey(customer) : '');

    useEffect(() => {
        setInputValue(customer ? customerKey(customer) : '');
    }, [customer]);

    const changeHandler = (ev: unknown, customer: BasicCustomer | null) => {
        dispatch(setCustomerFilter(customer))
    }

    return (
        <Autocomplete
            value={customer}
            onChange={changeHandler}
            inputValue={inputValue}
            onInputChange={(ev, value) => setInputValue(value)}
            options={customers}
            filterOptions={(customers, state) => customers.filter(c => customerKey(c).includes(state.inputValue.toUpperCase())
                || customerKey(c).replace('-', '').includes(state.inputValue.toUpperCase())
                || c.BillToName.toUpperCase().includes(state.inputValue.toUpperCase()))}
            renderInput={(params) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {className, ...inputProps} = params.inputProps;
                return (
                    <div className="input-group input-group-sm" ref={params.InputProps.ref}>
                        <div className="input-group-text">
                            <span className="bi-shop-window"/>
                        </div>
                        <input type="search" className="form-control form-control-sm" {...inputProps} />
                    </div>
                )
            }}
            fullWidth
            autoHighlight
            getOptionKey={(option) => customerKey(option)}
            getOptionLabel={(option) => customerKey(option)}
            renderOption={(props, customer) => {
                // eslint-disable-next-line react/prop-types
                const {key, ...optionProps} = props;
                return (
                    <Box key={key} component="li" sx={{width: 300}} {...optionProps} >
                        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start">
                            <div><strong>{customerKey(customer)}</strong></div>
                            <div>{customer.BillToName}</div>
                        </Stack>
                    </Box>
                )
            }}
            PopperComponent={CustomPopperComponent}
        />
    )
})

const CustomPopperComponent = (props: PopperProps) => {
    return (
        <Popper {...props} style={{width: 'fit-content'}} placement="bottom-start"/>
    )
}
