import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import ReactMarkdown from "react-markdown";

const MarkDown = () => {
    const readme = useSelector(s => s.github.readme)
    return (
        <div>
            <Link to='/'>Go Back</Link >
            <div>
                <ReactMarkdown>{readme}</ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkDown;