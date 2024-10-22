import React, {useEffect, useRef, useState} from 'react';
import Alert, {AlertProps} from 'react-bootstrap/Alert'
import classNames from "classnames";
import Badge from "react-bootstrap/Badge";
import {commaFormatter} from "chums-components";

export interface ContextAlertProps extends Omit<AlertProps, 'onClose'> {
    message?: string;
    context?: string;
    count?: number;
    onClose?: () => void;
    children?: React.ReactNode
}

export default function ContextAlert({
                                         message,
                                         color = 'primary',
                                         title,
                                         className = '',
                                         context,
                                         count = 0,
                                         dismissible,
                                         onClose,
                                         children}:ContextAlertProps) {
    const ref = useRef<number>(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        ref.current = window.setTimeout(() => {
            setShow(true);
        }, 350);
        return () => {
            window.clearTimeout(ref.current);
        }
    }, []);

    const closeHandler = () => {
        setShow(false);
        ref.current = window.setTimeout(() => {
            if (onClose) {
                onClose()
            }
        }, 350)
    }

    return (
        <Alert color={color} dismissible={dismissible} className={className}>
            <Alert.Heading>
                {!!context && (<span className="me-1">[{context}]</span>)}
                {!!title && (<span className="me-1">{title}:</span>)}
                {!!count && count > 1 && (
                    <Badge color={color}>{commaFormatter(count)}</Badge>
                )}
            </Alert.Heading>
            {message || children || null}
        </Alert>
    )
}
