import React from 'react';
import {Provider} from 'react-redux';
import App from "./app/App";
import {createRoot} from "react-dom/client";
import store from "./app/configureStore";

window.localStorage.setItem('debug', '*');
const container = document.getElementById('apps-open-order-status');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
