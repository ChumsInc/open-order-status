import type {SalesOrderRow} from "@/src/types";

const ImprintBadge = ({row}: { row: SalesOrderRow }) => {
    if (!row.UDF_IMPRINTED || row.UDF_IMPRINTED === 'N') {
        return null;
    }
    return <span className="badge text-bg-info me-1">IMP</span>
}

export default ImprintBadge;
