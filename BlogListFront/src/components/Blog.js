import { useState } from 'react';

const Blog = ({ blog, updLikes, delBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const showWhenAuthorized = { display: authorized ? '' : 'none' };

  const handleVisibleChange = (event) => {
    setVisible(!visible);

    if (user === blog.user.username) {
      setAuthorized(true);
    }
  };

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author}
        <button id='view-btn' onClick={handleVisibleChange}>
          view
        </button>
      </div>
      <div style={showWhenVisible} className='hiddenContent'>
        <div>
          url: <a href={`${blog.url}`}>{blog.url}</a> <br />
          likes: {blog.likes}
          <button id='like-btn' onClick={(e) => updLikes(e, blog)}>
            like
          </button>{' '}
          <br />
          user: {blog.user.username} <br />
          <div style={showWhenAuthorized} className='authorizedContent'>
            <button onClick={(e) => delBlog(e, blog.id)}>remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Blog.displayName = 'blog';

export default Blog;
