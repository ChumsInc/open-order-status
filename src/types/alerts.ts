import type {ErrorAlert} from "@chumsinc/ui-utils";
import type {Variant} from "react-bootstrap/types";

export interface StyledErrorAlert extends ErrorAlert {
    variant?: Variant
}
