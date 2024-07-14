import React, { useState } from 'react';

function CommentForm({ postId, addComment }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !content) return;

    const newComment = { author, content };
    await addComment(newComment);

    // Clear form
    setAuthor('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        placeholder="Your Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Your Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentForm;