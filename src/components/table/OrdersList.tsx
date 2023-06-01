import React, {Fragment, useEffect} from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {selectFilteredOrders, selectLoading, selectPage, selectRowsPerPage, selectSort} from "../../ducks/orders/selectors";
import {
    Alert,
    DataTableField,
    DataTableRow,
    LoadingProgressBar,
    SortableTable,
    SortableTableField,
    TablePagination
} from "chums-components";
import {SalesOrderRow} from "../../types";
import {calcStatus, friendlyDate, groupKey} from "../../ducks/orders/utils";
import {customerKey} from "../../utils";
import {loadOrders, setPage, setRowsPerPage, setSort} from "../../ducks/orders/actions";
import {SortProps} from "chums-types";
import classNames from "classnames";
import numeral from "numeral";
import CancelDateField from "./CancelDateField";
import SalesOrderToggle from "./SalesOrderToggle";
import CustomerLink from "./CustomerLink";
import OrderTypeBadge from "./OrderTypeBadge";
import HoldReasonBadge from "./HoldReasonBadge";
import UserName from "./UserName";
import ImprintBadge from "./ImprintBadge";
import OrderStatusContainer from "../../ducks/order-status/OrderStatusContainer";
import ToggleExpandAll from "./ToggleExpandAll";
import SalesOrderNo from "./SalesOrderNo";
import OrderDate from "./OrderDate";
import Version from "../../ducks/version/Version";

const fields: SortableTableField<SalesOrderRow>[] = [
    {field: 'SalesOrderNo', title: 'SO #', sortable: true, render: (row) => <SalesOrderNo row={row}/>},
    {field: 'SalesOrderNo', title: <ToggleExpandAll/>, render: (row) => <SalesOrderToggle row={row}/>},
    {field: 'OrderDate', title: 'Date', render: (row) => <OrderDate row={row} />, sortable: true},
    {field: 'UserLogon', title: 'User', sortable: true, render: (row) => <UserName row={row}/>},
    {field: 'OrderType', title: 'Type', render: (row) => <OrderTypeBadge row={row}/>, sortable: true},
    {field: 'CancelReasonCode', title: 'Hold', sortable: false, render: (row) => <HoldReasonBadge row={row}/>},
    {field: 'UDF_IMPRINTED', title: 'IMP', render: (row) => <ImprintBadge row={row}/>, sortable: false},
    {
        field: 'CustomerNo',
        title: 'Customer',
        render: (row) => <CustomerLink row={row}>{customerKey(row)}</CustomerLink>,
        sortable: true
    },
    {
        field: 'BillToName',
        title: 'Bill-To Name',
        sortable: true,
        render: (row) => <CustomerLink row={row}>{row.BillToName}</CustomerLink>
    },
    {field: 'ShipVia', title: 'Ship Via', sortable: true},
    {field: 'ShipExpireDate', title: 'Ship', sortable: true, render: (row) => friendlyDate(row.ShipExpireDate)},
    {field: 'CancelDate', title: 'Cancel', sortable: true, render: (row) => <CancelDateField order={row}/>},
    {
        field: 'OrderAmt',
        title: 'Total',
        sortable: true,
        className: 'text-end',
        render: (row) => numeral(row.OrderAmt).format('$0,0')
    },
    {field: 'Comment', title: 'Comment', sortable: true},
    {field: 'status', title: 'Status', render: row => <OrderStatusContainer row={row}/>, sortable: true, className: 'text-end'}
];

const commentFields: DataTableField<SalesOrderRow>[] = [
    {field: "SalesOrderNo", title: 'SO#', render: () => null, colSpan: 7},
    {
        field: 'lineComments',
        title: 'lineComments',
        render: (row) => <pre><span className="bi-info-circle me-1" />{row.lineComments?.lineComments ?? null}</pre>,
        colSpan: 7,
        className: 'font-monospace'
    },
    {field: 'status', title: '', render: () => null}
]
const notesFields: DataTableField<SalesOrderRow>[] = [
    {field: "SalesOrderNo", title: 'SO#', render: () => null, colSpan: 7},
    {
        field: 'status',
        title: 'lineComments',
        render: (row) => <pre><span className="bi-pencil-square me-1" />{row.status?.Notes ?? null}</pre>,
        colSpan: 7,
        className: 'font-monospace'
    },
    {field: 'status', title: '', render: () => null}
]
const errorFields: DataTableField<SalesOrderRow>[] = [
    {field: "SalesOrderNo", title: 'SO#', render: () => null, colSpan: 7},
    {
        field: 'errorMessage',
        title: 'lineComments',
        render: (row) => <Alert color="warning">{row.errorMessage ?? null}</Alert>,
        colSpan: 7,
        className: 'font-monospace'
    },
    {field: 'status', title: '', render: () => null}
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
    const loading = useSelector(selectLoading);
    const page = useSelector(selectPage);
    const rowsPerPage = useSelector(selectRowsPerPage);
    const list = useSelector(selectFilteredOrders);
    const sort = useSelector(selectSort);

    useEffect(() => {
        dispatch(loadOrders());
    }, [])

    const pageChangeHandler = (page: number) => dispatch(setPage(page));
    const onChangeSort = (sort: SortProps) => dispatch(setSort(sort));
    const onChangeRowsPerPage = (rpp: number) => dispatch(setRowsPerPage(rpp));

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
    return (
        <div>
            {loading && <LoadingProgressBar striped animated className="mt-1 mb-1" style={{height: '5px'}}/>}
            <div className="table-responsive">
                <SortableTable fields={fields} className="mt-3 table-hover"
                               data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                               keyField={orderKey} rowClassName={rowClassName}
                               renderRow={(row) => renderRow(row)}
                               currentSort={sort} onChangeSort={onChangeSort}
                />
            </div>
            <div className="d-flex justify-content-between align-items-start">
                <Version />
                <TablePagination page={page} onChangePage={pageChangeHandler}
                                 rowsPerPage={rowsPerPage} onChangeRowsPerPage={onChangeRowsPerPage}
                                 showFirst showLast bsSize="sm"
                                 count={list.length}/>
            </div>
        </div>
    )
}

export default OrdersList;
