import React, {ChangeEvent, useId} from 'react';
import numeral from "numeral";
import FormCheck from "react-bootstrap/FormCheck";
import classNames from "classnames";
import Card from "react-bootstrap/Card";

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
        <Card>
            <Card.Header as="h2" className={classNames("fs-2 lh-sm", titleClassName)}>
                <Card.Title className={classNames("fs-4 lh-sm", titleClassName)}>{title}</Card.Title>
            </Card.Header>
            <Card.Body>
                <h3 className="text-center text-nowrap">{numeral(sales).format('$ 0,0')}</h3>
                <hr/>
                <h4 className="text-center text-secondary">{numeral(count).format('0,0')}</h4>
            </Card.Body>
            <Card.Footer className="card-footer">
                <FormCheck type="checkbox" id={id}
                           label={visibilityLabel}
                           checked={visible} onChange={visibilityChangeHandler}/>

            </Card.Footer>
        </Card>
    )
}
