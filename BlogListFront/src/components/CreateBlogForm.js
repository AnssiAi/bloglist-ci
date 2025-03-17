import PropTypes from 'prop-types';
import { useState } from 'react';

const CreateBlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const createNewBlog = (event) => {
    event.preventDefault();
    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form id='blog_form' onSubmit={createNewBlog}>
        <div>
          title:
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            id='title'
            type='text'
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            id='author'
            type='text'
          />
        </div>
        <div>
          url:
          <input
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
            id='url'
            type='text'
          />
        </div>
        <button id='create-btn' type='submit'>
          create
        </button>
      </form>
    </div>
  );
};

CreateBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default CreateBlogForm;
