export const statusButtonClassName = ({statusCode, colorCode}: {
    statusCode?: string|null;
    colorCode?: string|null;
}) => {
    if (!colorCode && !statusCode) {
        return 'btn-outline-secondary';
    }
    if (colorCode) {
        return `btn-${colorCode}`;
    }
    switch (statusCode) {
        case 'shipping':
        case 'ready':
            return 'btn-success';
        case 'credithold':
            return 'btn-danger';
        case 'creditcard':
        case 'approval':
        case 'woa':
        case 'wop':
        case 'swop':
            return 'btn-warning';
        case 'hurship':
        case 'picksheet':
            return 'btn-primary';
        default:
            return 'btn-secondary';
    }
}
