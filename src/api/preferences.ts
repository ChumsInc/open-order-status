const reLocal = /^local/;


const sessionStoragePrefix:string = 'session/open-order-status';
const localStoragePrefix:string = 'local/open-order-status';


export const storageKeys = {
    filterDivision: `${sessionStoragePrefix}/filterDivision`,
    filterCustomer: `${sessionStoragePrefix}/filterCustomer`,
    filterUser: `${sessionStoragePrefix}/filterUser`,
    filterStatus: `${sessionStoragePrefix}/filterStatus`,
    showChums: `${sessionStoragePrefix}/showChums`,
    showEDI: `${sessionStoragePrefix}/showEDI`,
    showWeb: `${sessionStoragePrefix}/showWeb`,
    showOpen: `${sessionStoragePrefix}/showOpen`,
    showLate: `${sessionStoragePrefix}/showLate`,
    showBackOrder: `${sessionStoragePrefix}/showBackOrder`,
    showOnCancelDate: `${sessionStoragePrefix}/showOnCancelDate`,
    showPastCancelDate: `${sessionStoragePrefix}/showPastCancelDate`,
    showInvoicing: `${sessionStoragePrefix}/showInvoicing`,
    showDollars: `${sessionStoragePrefix}/showDollars`,

    expandAll: `${localStoragePrefix}/expandAll`,
    imprint: `${localStoragePrefix}/imprint`,
    rowsPerPage: `${localStoragePrefix}/rowsPerPage`,
};

export const localStorageKeys = {
}

function getStorage(key:string):Storage {
    return reLocal.test(key) ? window.localStorage : window.sessionStorage;
}

export const setPreference = (key:string, value:any) => {
    try {
        if (!global.window) {
            return;
        }
        getStorage(key).setItem(key, JSON.stringify(value));
    } catch(err:any) {
        console.log("setPreference()", err.message);
    }
};

export const clearPreference = (key:string) => {
    if (typeof window === 'undefined') {
        return;
    }
    getStorage(key).removeItem(key);
}

export const getPreference = (key:string, defaultValue: any) => {
    try {
        if (!global.window) {
            return defaultValue;
        }
        const value = getStorage(key).getItem(key);
        if (value === null) {
            return defaultValue;
        }
        return JSON.parse(value);
    } catch(err:any) {
        console.log("getPreference()", err.message);
        return defaultValue;
    }
};
