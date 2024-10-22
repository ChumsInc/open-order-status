import React, {useId} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/configureStore";
import {selectFilteredCustomers} from "../../ducks/filters/selectors";
import {selectCustomer} from "../../ducks/orders/selectors";
import {customerKey} from "../../utils";
import {useAutocomplete} from "@mui/base/useAutocomplete";
import {BasicCustomer} from "../../types";
import {setCustomerFilter} from "../../ducks/orders/actions";
import {Dropdown, InputGroup} from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import styled from "@emotion/styled";

export default React.forwardRef(function CustomerDropDown() {
    const dispatch = useAppDispatch();
    const customers = useAppSelector(selectFilteredCustomers);
    const customer = useAppSelector(selectCustomer);
    // const [_inputValue, setInputValue] = useState(customer ? customerKey(customer) : '');
    const id = useId();

    // useEffect(() => {
    //     setInputValue(customer ? customerKey(customer) : '');
    // }, [customer]);

    const changeHandler = (ev: React.SyntheticEvent, value: BasicCustomer | null) => {
        dispatch(setCustomerFilter(value));
    }

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        inputValue,
        popupOpen,
        focusedTag
    } = useAutocomplete({
        id,
        options: customers,
        getOptionLabel: (option) => customerKey(option),
        getOptionKey: (option) => customerKey(option),
        isOptionEqualToValue: (option, value) => customerKey(option) === customerKey(value),
        filterOptions: (customers, state) => customers.filter(c => customerKey(c).includes(state.inputValue.toUpperCase())
            || customerKey(c).replace('-', '').includes(state.inputValue.toUpperCase())
            || c.BillToName.toUpperCase().includes(state.inputValue.toUpperCase())),
        value: customer,
        onChange: changeHandler
    });


    // console.debug('CustomerDropDown()', getRootProps());
    return (
        <StyledCustomerDropdownRoot {...getRootProps()} >
            <InputGroup size="sm">
                <InputGroup.Text as="label" htmlFor={id} {...getInputLabelProps()}>
                    <span className="bi-shop-window" aria-label="Customer Filter"/>
                </InputGroup.Text>
                <input type="text" className="form-control form-control-sm" id={id}
                       {...getInputProps()} />
            </InputGroup>
            <Dropdown show={popupOpen}>
                {groupedOptions.length > 0 && (
                    <Dropdown.Menu as="ul" {...getListboxProps()} show={popupOpen}>
                        {(groupedOptions as BasicCustomer[])
                            .map((option, index) => {
                                const props = getOptionProps({option, index});
                                return (
                                    <Dropdown.Item as="li" {...props}>
                                        <Stack direction="vertical">
                                            {option && (
                                                <div className="me-3"><strong>{customerKey(option)}</strong></div>)}
                                            <div>{option.BillToName}</div>
                                        </Stack>
                                    </Dropdown.Item>
                                )
                            })}
                    </Dropdown.Menu>
                )}
            </Dropdown>
        </StyledCustomerDropdownRoot>
    )
})

const StyledCustomerDropdownRoot = styled('div')(() => `
    & .dropdown-menu {
        max-height: 50vh;
        overflow: auto;
    }
    & .dropdown-item.Mui-focused {
        color: var(--bs-dropdown-link-active-color);
        text-decoration: none;
        background-color: var(--bs-dropdown-link-active-bg);
    }
`);
