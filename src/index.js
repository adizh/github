import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root";
import store from "./redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);