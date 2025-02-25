import React, {Fragment, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {useSelector} from "react-redux";
import {
    selectFilteredOrders,
    selectOrdersUpdated,
    selectPage,
    selectRowsPerPage,
    selectSort
} from "@/ducks/orders/selectors";
import {
    DataTableField,
    DataTableRow,
    SortableTable,
    SortableTableField,
    TablePagination
} from "@chumsinc/sortable-tables";
import {SalesOrderRow} from "../../types";
import {calcStatus, friendlyDate, groupKey} from "@/ducks/orders/utils";
import {customerKey} from "@/utils/utils";
import {loadOrders, setPage, setRowsPerPage, setSort} from "@/ducks/orders/actions";
import {SortProps} from "chums-types";
import classNames from "classnames";
import numeral from "numeral";
import CancelDateField from "./CancelDateField";
import CustomerLink from "./CustomerLink";
import OrderTypeBadge from "./OrderTypeBadge";
import HoldReasonBadge from "./HoldReasonBadge";
import UserName from "./UserName";
import ImprintBadge from "./ImprintBadge";
import OrderStatusContainer from "@/ducks/order-status/OrderStatusContainer";
import ToggleExpandAll from "./ToggleExpandAll";
import SalesOrderNo from "./SalesOrderNo";
import OrderDate from "./OrderDate";
import Version from "@/ducks/version/Version";
import InvoiceBadge from "./InvoiceBadge";
import {storageKeys} from "../../api/preferences";
import Alert from 'react-bootstrap/Alert'
import {LocalStore} from "@chumsinc/ui-utils";

const fields: SortableTableField<SalesOrderRow>[] = [
    {
        field: 'SalesOrderNo',
        title: <div className="d-flex"><span className="me-3"> SO #</span><ToggleExpandAll/></div>,
        sortable: true,
        render: (row) => <SalesOrderNo row={row}/>
    },
    {field: 'OrderDate', title: 'Date', render: (row) => <OrderDate row={row}/>, sortable: true},
    {field: 'UserLogon', title: 'User', sortable: true, render: (row) => <UserName row={row}/>},
    {
        field: 'OrderType', title: 'Flags', render: (row) => (<>
            <OrderTypeBadge row={row}/>
            <HoldReasonBadge row={row}/>
            <ImprintBadge row={row}/>
            <InvoiceBadge row={row}/>
        </>), sortable: true
    },
    {
        field: 'CustomerNo',
        title: 'Customer',
        render: (row) => <div>
            <div><CustomerLink row={row}>{customerKey(row)}</CustomerLink></div>
            <small className="text-secondary text-wrap">{row.BillToName}</small>
        </div>,
        sortable: true
    },
    {
        field: 'ShipVia',
        title: 'Ship Via',
        sortable: true,
        render: (row) => <div>
            <div>{row.ShipVia}</div>
            <small className="text-secondary">{row.Comment}</small></div>
    },
    {field: 'ShipExpireDate', title: 'Ship', sortable: true, render: (row) => friendlyDate(row.ShipExpireDate)},
    {field: 'CancelDate', title: 'Cancel', sortable: true, render: (row) => <CancelDateField order={row}/>},
    {
        field: 'OrderAmt',
        title: 'Total',
        sortable: true,
        className: 'text-end',
        render: (row) => numeral(row.OrderAmt).format('$0,0')
    },
    // {field: 'Comment', title: 'Comment', sortable: true},
    {
        field: 'status',
        title: 'Status',
        render: row => <OrderStatusContainer row={row}/>,
        sortable: true,
        className: 'text-end'
    }
];

const commentFields: DataTableField<SalesOrderRow>[] = [
    {field: "SalesOrderNo", title: 'SO#', render: () => null, colSpan: 4},
    {
        field: 'lineComments',
        title: 'lineComments',
        render: (row) => <pre><span className="bi-info-circle me-1"/>{row.lineComments?.lineComments ?? null}</pre>,
        colSpan: 6,
        className: 'font-monospace'
    },
]
const notesFields: DataTableField<SalesOrderRow>[] = [
    {field: "SalesOrderNo", title: 'SO#', render: () => null, colSpan: 4},
    {
        field: 'status',
        title: 'lineComments',
        render: (row) => <pre><span className="bi-pencil-square me-1"/>{row.status?.Notes ?? null}</pre>,
        colSpan: 6,
        className: 'font-monospace'
    },
]
const errorFields: DataTableField<SalesOrderRow>[] = [
    {field: "SalesOrderNo", title: 'SO#', render: () => null, colSpan: 4},
    {
        field: 'errorMessage',
        title: 'lineComments',
        render: (row) => <Alert variant="warning">{row.errorMessage ?? null}</Alert>,
        colSpan: 6,
        className: 'font-monospace'
    },
]

const rowClassName = (row: SalesOrderRow) => {
    const status = calcStatus(row);
    return classNames({
        'text-warning': status.onCancelDate,
        'text-success': status.invoicing,
        'table-dark': status.backorder,
        'text-danger': status.late || status.pastCancelDate,
    })
}

const orderKey = (row: SalesOrderRow) => `${groupKey(row)}:${row.SalesOrderNo}}`
const OrdersList = () => {
    const dispatch = useAppDispatch();
    const page = useSelector(selectPage);
    const rowsPerPage = useSelector(selectRowsPerPage);
    const list = useSelector(selectFilteredOrders);
    const sort = useSelector(selectSort);
    const updated = useAppSelector(selectOrdersUpdated);


    useEffect(() => {
        dispatch(loadOrders());
    }, [])


    const pageChangeHandler = (page: number) => dispatch(setPage(page));
    const onChangeSort = (sort: SortProps) => dispatch(setSort(sort));
    const onChangeRowsPerPage = (rpp: number) => {
        LocalStore.setItem(storageKeys.rowsPerPage, rpp);
        dispatch(setRowsPerPage(rpp));
    }

    const renderRow = (row: SalesOrderRow) => {
        if (!row.lineComments && !row.status?.Notes && !row.errorMessage) {
            return <DataTableRow key={row.SalesOrderNo} fields={fields} row={row} rowClassName={rowClassName(row)}/>
        }

        return (
            <Fragment key={row.SalesOrderNo}>
                <DataTableRow fields={fields} row={row} rowClassName={classNames(rowClassName(row), 'border-0')}/>
                {!!row.status?.Notes && <DataTableRow fields={notesFields} row={row}
                                                      rowClassName={classNames(rowClassName(row), 'comment-row', {'border-0': !!row.lineComments || !!row.errorMessage})}/>}
                {!!row.lineComments && <DataTableRow fields={commentFields} row={row}
                                                     rowClassName={classNames(rowClassName(row), 'comment-row', {'border-0': !!row.errorMessage})}/>}
                {!!row.errorMessage && <DataTableRow fields={errorFields} row={row}
                                                     rowClassName={classNames(rowClassName(row), 'comment-row')}/>}
            </Fragment>
        )
    }

    if (!list.length && !updated) {
        return (
            <Alert color="warning">
                <span className="bi-app-indicator me-3"/>
                Loading initial data.
            </Alert>
        )
    }

    return (
        <div>
            <div className="table-responsive">
                <SortableTable fields={fields} className="mt-3 table-hover"
                               data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                               keyField={orderKey} rowClassName={rowClassName}
                               renderRow={(row) => renderRow(row)}
                               currentSort={sort} onChangeSort={onChangeSort}
                />
            </div>
            <div className="d-flex justify-content-between align-items-start">
                <Version/>
                <TablePagination page={page} onChangePage={pageChangeHandler}
                                 rowsPerPage={rowsPerPage} rowsPerPageProps={{onChange: onChangeRowsPerPage}}
                                 showFirst showLast size="sm"
                                 count={list.length}/>
            </div>
        </div>
    )
}

export default OrdersList;
