import React, { useState } from 'react';
import './commentForm.css';

function CommentForm({ comments, submitComment }) {

    const [ state, setState ] = useState({ nick: '', text: '' });

    return (
        <form id="form" onSubmit={function(event) {
            event.preventDefault();
            const newDate = new Date();
            submitComment({
                id: comments.length + 1,
                nick: state.nick,
                createdAt: `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`,
                text: state.text,
                image: ''
            });
            setState({ nick: '', text: '' });
        }}>
            <label>Nick Name : </label>
            <input 
                onChange={function(event) {
                    setState(prevState => ({ ...prevState, nick: event.target.value }));
                }}
                value={ state.nick } 
                type="text" 
                id="nick" 
            ></input>
            <textarea 
                onChange={function(event) {
                    setState(prevState => ({ ...prevState, text: event.target.value }));
                }} 
                value={ state.text } 
                type="text" 
                id="text" 
                rows="5" 
                cols="52"
            ></textarea><br />
            <button type="submit" id="submit">Post</button>
        </form>
    );

}

export default CommentForm;