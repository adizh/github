import React from 'react';
import { useSelector} from "react-redux";
import ListItem from "./listItem";

const RepoList = () => {
    const reposArr = useSelector(s => s.github.gitHubData);
    return (
        <ul>
            {
                reposArr.map((repo) => (
                    <ListItem name={repo.name} key={repo.id}/>
                ))
            }

        </ul>
    );
};

export default RepoList;