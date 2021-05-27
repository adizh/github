import React from 'react';
import {Link} from "react-router-dom";
import {getReadme,updateRepoName} from "../redux/reducers/github";
import {useDispatch, useSelector} from "react-redux";


const ListItem = ({name}) => {
    const dispatch = useDispatch();
    const userName = useSelector(s => s.github.userName);
    const getRepoReadme = () => {
        dispatch(updateRepoName(name));
        dispatch(getReadme(userName, name))

    };
    return (
        <li className='user' >
            <Link to='/md' onClick={getRepoReadme}>{name}</Link>
        </li>
    );
};

export default ListItem;