import React, { useState } from 'react';
import DeleteCommentForm from './DeleteCommentForm';

function CommentList({ comments, postId, onCommentDeleted }) {
  const [commentToDelete, setCommentToDelete] = useState(null);

  const handleDeleteClick = (commentId) => {
    setCommentToDelete(commentId);
  };

  const handleDeleteCancel = () => {
    setCommentToDelete(null);
  };

  const handleCommentDeleted = () => {
    setCommentToDelete(null);
    onCommentDeleted();
  };

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
            <button onClick={() => handleDeleteClick(comment.id)}>Delete</button>
            {commentToDelete === comment.id && (
              <DeleteCommentForm
                commentId={comment.id}
                onCancel={handleDeleteCancel}
                onCommentDeleted={handleCommentDeleted}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default CommentList;