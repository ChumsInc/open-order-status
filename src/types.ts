import {SalesOrderHeader} from "chums-types";

export type OpenOrderStatusGroup = 'shipping' | 'cs' | 'imp';

export interface OpenOrderStatusCode {
    id: number;
    StatusCode: string;
    StatusDescription: string;
    StatusType: OpenOrderStatusGroup
}

export interface BasicCustomer {
    ARDivisionNo: string;
    CustomerNo: string;
    BillToName: string;
}


export interface ARDivisionList {
    [key:string]: string;
}

export interface ARDivisionResponse {
    ARDivisionNo: string;
    ARDivisionDesc: string;
}

export interface CustomerList {
    [key: string]: string;
}

export interface SalesOrderStatusRow {
    id: number;
    StatusCode: string|null;
    Notes: string|null;
    User: string|null;
    StatusType: string|null;
    timestamp: string|null;
}

export interface SalesOrderLineComments {
    SalesOrderNo: string;
    lineComments: string;
}

export interface SalesOrderRow extends Pick<SalesOrderHeader, 'ARDivisionNo' | 'CustomerNo' | 'SalesOrderNo'
    | 'OrderDate' | 'OrderStatus' | 'OrderType' | 'BillToName' | 'ShipExpireDate' | 'ShipVia' | 'Comment'
    | 'UDF_IMPRINTED' | 'CancelReasonCode' | 'CurrentInvoiceNo'> {
    CancelDate: string|null;
    UserLogon: string;
    OrderAmt: number|string;
    isEDI: boolean;
    isB2B: boolean;
    isWebsite: boolean;
    CustomerName: string;
    status: SalesOrderStatusRow|null;
    lineComments: SalesOrderLineComments|null;
    saving?: boolean;
    errorMessage?: string;
}

export interface SalesOrderList {
    [key:string]: SalesOrderRow;
}

export interface SalesOrderGroupList {
    [key:string]: {
        count: number;
        expanded: boolean;
        row:SalesOrderRow;
        salesOrders: SalesOrderRow[];
    }
}

export type SalesOrderStatusGroup = 'onTime'|'late'|'backorder'|'onCancelDate'|'pastCancelDate'|'invoicing'|'edi'|'web'|'chums';
export interface GroupTotal {
    count: number;
    value: string|number;
}

export type SalesOrderTotals = {
    [key in SalesOrderStatusGroup]: GroupTotal;
};

export interface SalesOrderStatusData {
    id: number;
    groupKey: string;
    SalesOrderNo: string;
    StatusCode: string|null;
    Notes: string|null;
}

export interface ToggleExpandOrder {
    groupKey: string;
    nextPage?: number;
}
