import React from "react";
import FilterByDate from "./FilterByDate";
import ImprintToggle from "./ImprintToggle";
import ReloadButton from "./ReloadButton";
import UpdatedTimestamp from "./UpdatedTimestamp";
import ShowEDICheckbox from "./ShowEDICheckbox";
import ShowChumsCheckbox from "./ShowChumsCheckbox";
import ShowWebCheckbox from "./ShowWebCheckbox";
import AutoRefreshInterval from "./AutoRefreshInterval";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ShowTestCheckbox from "_components/filters/ShowTestCheckbox";

function OrderActionBar() {
    return (
        <Row gap={3} className="mb-3 align-items-baseline">
            <Col xs="auto">
                <FilterByDate/>
            </Col>
            <Col xs="auto">
                <ImprintToggle/>
            </Col>
            <Col xs="auto">
                <AutoRefreshInterval />
            </Col>
            <Col xs="auto">
                <ReloadButton/>
            </Col>
            <Col xs="auto">
                <UpdatedTimestamp/>
            </Col>
            <Col xs/>
            <Col xs="auto">
                <ShowChumsCheckbox/>
            </Col>
            <Col xs="auto">
                <ShowEDICheckbox/>
            </Col>
            <Col xs="auto">
                <ShowWebCheckbox/>
            </Col>
            <Col xs="auto">
                <ShowTestCheckbox/>
            </Col>
        </Row>
    )
}
OrderActionBar.displayName = "OrderActionBar";
export default OrderActionBar;
