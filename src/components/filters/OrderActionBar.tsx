import React from "react";
import FilterByDate from "./FilterByDate";
import ImprintToggle from "./ImprintToggle";
import ReloadButton from "./ReloadButton";
import UpdatedTimestamp from "./UpdatedTimestamp";
import ShowEDICheckbox from "./ShowEDICheckbox";
import ShowChumsCheckbox from "./ShowChumsCheckbox";
import ShowWebCheckbox from "./ShowWebCheckbox";

const OrderActionBar = () => {

    return (
        <div className="row g-3 mb-3 align-items-baseline">
            <div className="col-auto">
                <FilterByDate/>
            </div>
            <div className="col-auto">
                <ImprintToggle/>
            </div>
            <div className="col-auto">
                <ReloadButton/>
            </div>
            <div className="col-auto">
                <UpdatedTimestamp/>
            </div>
            <div className="col"/>
            <div className="col-auto">
                <ShowChumsCheckbox/>
            </div>
            <div className="col-auto">
                <ShowEDICheckbox/>
            </div>
            <div className="col-auto">
                <ShowWebCheckbox/>
            </div>
        </div>
    )
}

export default OrderActionBar
