import {
    ARDivisionList,
    ARDivisionResponse,
    OpenOrderStatusCode,
    SalesOrderRow,
    SalesOrderStatusData,
    SalesOrderStatusRow
} from "../types";
import {fetchJSON} from "chums-components";
import dayjs from "dayjs";

export async function fetchStatusList(): Promise<OpenOrderStatusCode[]> {
    try {
        const url = '/node-sage/api/CHI/salesorder/status/codes';
        const {states} = await fetchJSON<{ states: OpenOrderStatusCode[] }>(url);
        return states ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchStatusList()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchStatusList()", err);
        return Promise.reject(new Error('Error in fetchStatusList()'));
    }
}

export interface FetchOrdersOptions {
    imprint: boolean;
    maxDate: string | Date;
}

export async function fetchOrdersList({imprint, maxDate}: FetchOrdersOptions): Promise<SalesOrderRow[]> {
    try {
        const url = '/node-sage/api/CHI/salesorder/status/list'
        const options = new URLSearchParams();
        options.set('company', 'chums')
        if (imprint) {
            options.set('type:imprint', 'on')
        }
        options.set('maxdate', dayjs(maxDate).format('YYYY-MM-DD'));
        const {list} = await fetchJSON<{ list: SalesOrderRow[] }>(url + '?' + options.toString(), {cache: 'no-cache'})
        return list;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchOrdersList()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchOrdersList()", err);
        return Promise.reject(new Error('Error in fetchOrdersList()'));
    }
}

export async function postOrderStatus(arg:SalesOrderStatusData):Promise<SalesOrderStatusRow|null> {
    try {
        const body = {
            action: 'save',
            company: 'chums',
            id: arg.id,
            so: arg.SalesOrderNo,
            state: arg.StatusCode ?? '',
            note: arg.Notes ?? '',
        }
        const url = `/node-sage/api/CHI/salesorder/status/v2/${arg.SalesOrderNo}`;
        const {status} = await fetchJSON<{status: SalesOrderStatusRow}>(url, {method: 'POST', body: JSON.stringify(body)});
        return status ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("postOrderComment()", err.message);
            return Promise.reject(err);
        }
        console.debug("postOrderComment()", err);
        return Promise.reject(new Error('Error in postOrderComment()'));
    }
}

export async function fetchARDivisions():Promise<ARDivisionList> {
    try {
        const url = '/api/search/division/chums';
        const {result} = await fetchJSON<{result: ARDivisionResponse[]}>(url);
        const response:ARDivisionList = {};
        result.forEach(div => {
            response[div.ARDivisionNo] = div.ARDivisionDesc;
        });
        return response;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchARDivisions()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchARDivisions()", err);
        return Promise.reject(new Error('Error in fetchARDivisions()'));
    }
}
