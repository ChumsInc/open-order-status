import type {SalesOrderRow} from "../../types";
import {dateCreated, dateUpdated} from "@/utils/utils";
import Badge from "react-bootstrap/Badge";

const UserName = ({row}: { row: SalesOrderRow }) => {
    return (
        <div>
            {row.isB2B && (<Badge bg="primary" className="me-1">B2B</Badge>)}
            {row.isEDI && (<Badge bg="info" className="me-1">EDI</Badge>)}
            {row.isWebsite && (<Badge bg="secondary" className="me-1">Shopify</Badge>)}
            <div>
                <div>
                    <span className="bi-person me-1" />
                    {row.UserLogon !== 'websites' && (<span className="me-3">{row.UserLogon}</span>)}
                    <small className="text-secondary">{dateCreated(row)}</small>
                </div>
                {!(row.DateUpdated === row.DateCreated && row.TimeUpdated === row.TimeCreated) && (
                    <div>
                        <span className="bi-person-fill me-1 text-primary" />
                        <span className="me-3">{row.UpdatedByUser}</span>
                        <small className="text-secondary">{dateUpdated(row)}</small>
                    </div>
                )}
            </div>
        </div>
    )
}
export default UserName;
