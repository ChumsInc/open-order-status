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
            <div className="col-2">
                <OnTimeCard/>
            </div>
            <div className="col-2">
                <LateOrdersCard/>
            </div>
            <div className="col-2">
                <BackOrdersCard/>
            </div>
            <div className="col-2">
                <CancelDateOrdersCard/>
            </div>
            <div className="col-2">
                <PastCancelDateOrdersCard/>
            </div>
            <div className="col-2">
                <InvoicingCard/>
            </div>
        </div>
    )
}
