import React, {ChangeEvent, useId} from 'react';
import numeral from "numeral";
import classNames from "classnames";
import FormCheck from "react-bootstrap/FormCheck";
import Card from "react-bootstrap/Card";
import {Grid2} from "@mui/material";

export default function StatusCard({
                                       title,
                                       titleClassName,
                                       sales,
                                       count,
                                       visible,
                                       visibilityLabel,
                                       onToggleVisibility
                                   }: {
    title: string;
    titleClassName?: string;
    sales: string | number;
    count: number;
    visible: boolean;
    visibilityLabel: string;
    onToggleVisibility: (checked: boolean) => void
}) {
    const id = useId();

    const visibilityChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        return onToggleVisibility(ev.target.checked);
    }
    return (
        <Card className="card">
            <Card.Header>
                <Card.Title className={classNames("fs-4 lh-sm", titleClassName)}>{title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Grid2 container>
                    <Grid2 size="auto">Sales</Grid2>
                    <Grid2 size="grow" className="text-end">{numeral(sales).format('$ 0,0')}</Grid2>
                </Grid2>
                <Grid2 container>
                    <Grid2 size="auto">Count</Grid2>
                    <Grid2 size="grow" className="text-end">{numeral(count).format('0,0')}</Grid2>
                </Grid2>
            </Card.Body>
            <Card.Footer>
                <FormCheck type="checkbox" id={id}
                           label={visibilityLabel}
                           checked={visible} onChange={visibilityChangeHandler}/>
            </Card.Footer>
        </Card>
    )
}
