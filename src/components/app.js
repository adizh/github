import React from 'react';
import {getHubData, updateUserName} from "../redux/reducers/github";
import {useDispatch} from "react-redux";
import RepoList from "./repoList";


const App = () => {
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getHubData(e.target.children[0].value))
        dispatch(updateUserName(e.target.children[0].value))
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder='Username'/>
                <button  type='submit'>Look repos</button>
            </form>
            <RepoList/>
        </div>
    );
};
export default App