import React, {useEffect, useState} from 'react';
import {customerKey} from "@/utils/utils";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectFilteredCustomers} from "@/ducks/filters/selectors";
import {useSelector} from "react-redux";
import {selectCustomer} from "@/ducks/orders/selectors";
import Autocomplete from "@mui/material/Autocomplete";
import {BasicCustomer} from "@/src/types";
import {setCustomerFilter} from "@/ducks/orders/actions";
import {Popper, PopperProps} from "@mui/material";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "@emotion/styled";

const CustomerOption = styled.li`
    width: 20rem;
    display: flex;
    flex-direction: column;
`;


export default function CustomerAutoComplete() {
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
                const {className, value, size, ...inputProps} = params.inputProps;
                return (
                    <InputGroup size="sm" ref={params.InputProps.ref}>
                        <InputGroup.Text>
                            <span className="bi-shop-window"/>
                        </InputGroup.Text>
                        <FormControl type="search" value={(value ?? '') as string} {...inputProps} />
                    </InputGroup>
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
                    <CustomerOption key={key} {...optionProps} >
                        <div><strong>{customerKey(customer)}</strong></div>
                        <div>{customer.BillToName}</div>
                    </CustomerOption>
                )
            }}
            slots={{
                popper: CustomPopperComponent
            }}
        />
    )
}

const CustomPopperComponent = (props: PopperProps) => {
    return (
        <Popper {...props} style={{width: 'fit-content'}} placement="bottom-start"/>
    )
}
