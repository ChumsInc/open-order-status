import React from 'react';
import OnTimeCard from "./OnTimeCard";
import LateOrdersCard from "./LateOrdersCard";
import BackOrdersCard from "./BackOrdersCard";
import CancelDateOrdersCard from "./CancelDateOrdersCard";
import PastCancelDateOrdersCard from "./PastCancelDateOrdersCard";
import InvoicingCard from "./InvoicingCard";
import {Grid2} from "@mui/material";

export default function StatusCards() {
    return (
        <Grid2 container spacing={3} className="mb-5">
            <Grid2 size={2}>
                <OnTimeCard/>
            </Grid2>
            <Grid2 size={2}>
                <LateOrdersCard/>
            </Grid2>
            <Grid2 size={2}>
                <BackOrdersCard/>
            </Grid2>
            <Grid2 size={2}>
                <CancelDateOrdersCard/>
            </Grid2>
            <Grid2 size={2}>
                <PastCancelDateOrdersCard/>
            </Grid2>
            <Grid2 size={2}>
                <InvoicingCard/>
            </Grid2>
        </Grid2>
    )
}
