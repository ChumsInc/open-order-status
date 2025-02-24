import React from 'react';
import Alert, {AlertProps} from 'react-bootstrap/Alert'
import Badge from "react-bootstrap/Badge";

export interface ContextAlertProps extends AlertProps {
    context?:string;
    count?: number;
}
export default function ContextAlert({context, count, variant, children, ...rest}:ContextAlertProps){

    return (
        <Alert variant={variant} {...rest}>
            {context && (<Alert.Heading>
                {context}
                {(count ?? 0) > 1 && (
                    <Badge  bg={variant}>({count})</Badge>
                )}
            </Alert.Heading>)}
            {children}
        </Alert>
    )
}
