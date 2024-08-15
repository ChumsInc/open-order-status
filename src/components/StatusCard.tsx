import React, {ChangeEvent} from 'react';
import numeral from "numeral";
import {FormCheck} from "chums-components";
import classNames from "classnames";

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

    const visibilityChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        return onToggleVisibility(ev.target.checked);
    }
    return (
        <div className="card">
            <div className="card-header">
                <h2 className={classNames("card-title fs-4 lh-sm", titleClassName)}>{title}</h2>
            </div>
            <div className="card-body">
                <div className="row g-3">
                <div className="col-auto">Sales</div>
                    <div className="col text-end">{numeral(sales).format('$ 0,0')}</div>
                </div>
                <div className="row g-3">
                    <div className="col-auto">Count</div>
                    <div className="col text-end">{numeral(count).format('0,0')}</div>
                </div>
            </div>
            <div className="card-footer">
                <FormCheck type="checkbox"
                           label={visibilityLabel}
                           checked={visible} onChange={visibilityChangeHandler}/>

            </div>
        </div>
    )
}
