import React from 'react';
import ARDivisionFilter from "./ARDivisionFilter";
import UserFilter from "./UserFilter";
import SalesOrderFilter from "./SalesOrderFilter";
import StatusFilter from "./StatusFilter";
import CustomerAutoComplete from "./CustomerAutoComplete";

const OrderDateStatusToggles = () => {
    return (
        <div className="row g-3 align-items-baseline">
            <div className="col-auto">
                Filters:
            </div>
            <div className="col-auto">
                <ARDivisionFilter/>
            </div>
            <div className="col-auto">
                <CustomerAutoComplete/>
            </div>
            <div className="col-auto">
                <UserFilter/>
            </div>
            <div className="col-auto">
                <SalesOrderFilter/>
            </div>
            <div className="col-auto">
                <StatusFilter/>
            </div>
        </div>
    )
}

export default OrderDateStatusToggles;
