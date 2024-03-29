import {CustomerList, SalesOrderRow} from "./types";
import dayjs from "dayjs";

export function customerKey(val:{ARDivisionNo: string, CustomerNo: string}):string {
    return `${val.ARDivisionNo}-${val.CustomerNo}`;
}

export const VALUE_VARIES = '--VARIES--';


export const dateCreated = (row:Pick<SalesOrderRow, 'DateCreated'|'TimeCreated'>):string|null => {
    if (!row.DateCreated || !row.TimeCreated || !dayjs(row.DateCreated).isValid()) {
        return null;
    }
    return dayjs(row.DateCreated).add(+row.TimeCreated, 'hours').format('MM/DD/YY HH:mm')
}

export const dateUpdated = (row:Pick<SalesOrderRow, 'DateUpdated'|'TimeUpdated'>):string|null => {
    if (!row.DateUpdated || !row.TimeUpdated || !dayjs(row.DateUpdated).isValid()) {
        return null;
    }
    return dayjs(row.DateUpdated).add(+row.TimeUpdated, 'hours').format('MM/DD/YY HH:mm');
}
