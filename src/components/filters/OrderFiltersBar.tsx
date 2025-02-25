import React from 'react';
import ARDivisionFilter from "./ARDivisionFilter";
import UserFilter from "./UserFilter";
import SalesOrderFilter from "./SalesOrderFilter";
import StatusFilter from "./StatusFilter";
import ImprintOnlyAlert from "./ImprintOnlyAlert";
import CustomerDropDown from "./CustomerDropDown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const OrderFiltersBar = () => {
    return (
        <>
            <Row className="g-3 align-items-baseline">
                <Col xs="auto">
                    Filters:
                </Col>
                <Col xs="auto">
                    <ARDivisionFilter/>
                </Col>
                <Col xs="auto">
                    <CustomerDropDown/>
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
            <ImprintOnlyAlert/>
        </>
    )
}

export default OrderFiltersBar;
