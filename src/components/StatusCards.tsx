import React from 'react';
import OnTimeCard from "./OnTimeCard";
import LateOrdersCard from "./LateOrdersCard";
import BackOrdersCard from "./BackOrdersCard";
import CancelDateOrdersCard from "./CancelDateOrdersCard";
import PastCancelDateOrdersCard from "./PastCancelDateOrdersCard";
import InvoicingCard from "./InvoicingCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function StatusCards() {
    return (
        <Row className="g-3 mb-5">
            <Col xs="2">
                <OnTimeCard/>
            </Col>
            <Col xs="2">
                <LateOrdersCard/>
            </Col>
            <Col xs="2">
                <BackOrdersCard/>
            </Col>
            <Col xs="2">
                <CancelDateOrdersCard/>
            </Col>
            <Col xs="2">
                <PastCancelDateOrdersCard/>
            </Col>
            <Col xs="2">
                <InvoicingCard/>
            </Col>
        </Row>
    )
}
