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
import Stack from "react-bootstrap/Stack";
import ShowTestCheckbox from "@/components/filters/ShowTestCheckbox";

const OrderActionBar = () => {

    return (
        <Row className="row g-3 mb-3 align-items-baseline">
            <Col xs="auto">
                <FilterByDate/>
            </Col>
            <Col xs="auto">
                <ImprintToggle/>
            </Col>
            <Col xs="auto">
                <AutoRefreshInterval/>
            </Col>
            <Col xs="auto">
                <ReloadButton/>
            </Col>
            <Col xs="auto">
                <UpdatedTimestamp/>
            </Col>
            <Col/>
            <Col xs="auto">
                <Stack direction="horizontal" gap={2}>
                    <ShowChumsCheckbox/>
                    <ShowEDICheckbox/>
                    <ShowWebCheckbox/>
                    <ShowTestCheckbox/>
                </Stack>
            </Col>
        </Row>
    )
}

export default OrderActionBar
