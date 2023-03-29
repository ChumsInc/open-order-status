import React from "react";
import FilterByDate from "./FilterByDate";
import ImprintToggle from "./ImprintToggle";
import ReloadButton from "./ReloadButton";
import ARDivisionFilter from "./ARDivisionFilter";
import CustomerFilter from "./CustomerFilter";
import UserFilter from "./UserFilter";

const OrderFiltersBar = () => {
    return (
        <div className="row g-3 mb-3 align-items-baseline">
            <div className="col-auto">
                <ImprintToggle/>
            </div>
            <div className="col-auto">
                <FilterByDate/>
            </div>
            <div className="col-auto">
                <ReloadButton/>
            </div>
            <div className="col" />
            <div className="col-auto">
                <label>Filters:</label>
            </div>
            <div className="col-auto">
                <ARDivisionFilter />
            </div>
            <div className="col-auto">
                <CustomerFilter />
            </div>
            <div className="col-auto">
                <UserFilter />
            </div>
        </div>
    )
}

export default OrderFiltersBar
