import React from 'react';

function CommentList({ comments }) {
  return (
    <div className="comment-list">
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map(comment => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            <small>By {comment.author} on {new Date(comment.created_at).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default CommentList;