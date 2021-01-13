import React from 'react';
import './singleComment.css';

function SingleComment({ nick, createdAt, text, image }) {
    return (
        <li className="comment">
            <span className="nick">{ nick }</span>
            <span className="createdAt">{ createdAt }</span>
            <p className="text">{ text }</p>
            <img src={ image } alt="petImage"></img>
        </li>
    );
}
export default SingleComment;