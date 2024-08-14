import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/configureStore";
import {useSelector} from "react-redux";
import {loadVersion, selectCurrentVersion} from "./index";

export default function Version() {
    const dispatch = useAppDispatch();
    const version = useSelector(selectCurrentVersion);
    useEffect(() => {
        dispatch(loadVersion());
    }, [])

    return (
        <div className="text-secondary p-2" onClick={() => dispatch(loadVersion())}>
            Version: {version}
        </div>

    )
};
