import React from "react";
import {Switch,Route} from 'react-router-dom'
import App from "./app";
import MarkDown from "./markDown";

const Root = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={()=> <App/>}/>
                <Route exact path='/md' component={()=> <MarkDown/>}/>
            </Switch>
        </div>
    );
};

export default Root;