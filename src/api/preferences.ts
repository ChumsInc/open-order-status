const sessionStoragePrefix: string = 'session/open-order-status';
const localStoragePrefix: string = 'local/open-order-status';


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
    leadTime: `${localStoragePrefix}/leadTime`,
    rowsPerPage: `${localStoragePrefix}/rowsPerPage`,
};
