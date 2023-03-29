import {CustomerList} from "./types";

export function customerKey(val:{ARDivisionNo: string, CustomerNo: string}):string {
    return `${val.ARDivisionNo}-${val.CustomerNo}`;
}

export const VALUE_VARIES = '--VARIES--';
