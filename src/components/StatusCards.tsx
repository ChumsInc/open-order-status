import React from 'react';
import OnTimeCard from "./OnTimeCard";
import LateOrdersCard from "./LateOrdersCard";
import BackOrdersCard from "./BackOrdersCard";
import CancelDateOrdersCard from "./CancelDateOrdersCard";
import PastCancelDateOrdersCard from "./PastCancelDateOrdersCard";
import InvoicingCard from "./InvoicingCard";

export default function StatusCards() {
    return (
        <div className="row g-3 mb-5">
            <div className="col">
                <OnTimeCard/>
            </div>
            <div className="col">
                <LateOrdersCard/>
            </div>
            <div className="col">
                <BackOrdersCard/>
            </div>
            <div className="col">
                <CancelDateOrdersCard/>
            </div>
            <div className="col">
                <PastCancelDateOrdersCard/>
            </div>
            <div className="col">
                <InvoicingCard/>
            </div>
        </div>
    )
}
