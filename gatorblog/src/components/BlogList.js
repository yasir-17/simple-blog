import React from 'react';
import BlogPost from './BlogPost';

function BlogList({ posts, fetchPostWithComments }) {
  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogPost key={post.id} post={post} fetchPostWithComments={fetchPostWithComments} />
      ))}
    </div>
  );
}

export default BlogList;