import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BlogList from './components/BlogList';
import NewPostForm from './components/NewPostForm';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/posts/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async (newPost) => {
    try {
      const response = await fetch('http://localhost:8000/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts([...posts, data]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const fetchPostWithComments = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${postId}/comments/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const comments = await response.json();
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, comments } : post
      ));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <NewPostForm addPost={addPost} />
      <BlogList posts={posts} fetchPostWithComments={fetchPostWithComments} />
    </div>
  );
}

export default App;