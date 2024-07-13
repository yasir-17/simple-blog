import React, { useState, useEffect } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

function BlogPost({ post, fetchPostWithComments }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${post.id}/comments/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const addComment = async (newComment) => {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${post.id}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setComments([...comments, data]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>Created at: {new Date(post.created_at).toLocaleString()}</small>
      <button onClick={toggleComments}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <>
          <CommentList comments={comments} />
          <CommentForm postId={post.id} addComment={addComment} />
        </>
      )}
    </div>
  );
}

export default BlogPost;