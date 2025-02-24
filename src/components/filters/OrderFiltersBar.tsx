import React from 'react';
import ARDivisionFilter from "./ARDivisionFilter";
import UserFilter from "./UserFilter";
import SalesOrderFilter from "./SalesOrderFilter";
import StatusFilter from "./StatusFilter";
import CustomerAutoComplete from "./CustomerAutoComplete";
import ImprintOnlyAlert from "./ImprintOnlyAlert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const OrderFiltersBar = () => {
    return (
        <>
            <Row gap={3} className="align-items-baseline">
                <Col xs="auto">
                    Filters:
                </Col>
                <Col xs="auto">
                    <ARDivisionFilter/>
                </Col>
                <Col xs="auto">
                    <CustomerAutoComplete/>
                </Col>
                <Col xs="auto">
                    <UserFilter/>
                </Col>
                <Col xs="auto">
                    <SalesOrderFilter/>
                </Col>
                <Col xs="auto">
                    <StatusFilter/>
                </Col>
            </Row>
            <ImprintOnlyAlert />
        </>
    )
}

export default OrderFiltersBar;
