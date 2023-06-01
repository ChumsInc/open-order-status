import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {loadVersion, selectCurrentVersion} from "./index";
import {Alert} from "chums-components";

export default function Version() {
    const dispatch = useAppDispatch();
    const version = useSelector(selectCurrentVersion);
    useEffect(() => {
        dispatch(loadVersion());
    }, [])

    return (
        <div onClick={() => dispatch(loadVersion())}>
            <Alert color="light" title="Version">
                {version}
            </Alert>
        </div>

    )
};
