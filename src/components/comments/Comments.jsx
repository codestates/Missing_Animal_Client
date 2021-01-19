import React, { useState } from 'react';
import CommentForm from './CommentForm';
import SingleComment from './SingleComment';
import './comments.css';

function Comments() {

  const [ state, setState ] = useState({
    comments: [
      {
        id: 1,
        nick: '화이트 해커',
        createdAt: '2020/10/11',
        text: '다리 밑 공터 발견',
        image: ''
      },
      {
        id: 2,
        nick: '블랙 해커',
        createdAt: '2020/10/12',
        text: '아파트 뒷 골목 발견',
        image: ''
      },
      {
        id: 3,
        nick: '안 해커',
        createdAt: '2020/10/13',
        text: '편의점 앞 발견',
        image: ''
      }
    ]
  });
    
  const reverseOrderComments = state.comments.reverse();
  return (
    <div>
      <div id="main">
        <h2>Comments</h2><hr />
        <CommentForm 
          comments={state.comments} 
          submitComment={function(comment) {
            setState(prevState => ({ comments: [...prevState.comments, comment] }));
        }}></CommentForm>
      </div>
      <ul id="comments">
        {reverseOrderComments.map(comment => 
          <SingleComment 
            key={ comment.id } 
            nick={ comment.nick } 
            createdAt={ comment.createdAt } 
            text={ comment.text }
            image={ comment.image }
          ></SingleComment>
        )}
      </ul>
    </div>
  );

}

export default Comments;
