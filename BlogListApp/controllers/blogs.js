const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

const { userExtractor } = require('../utils/middleware');

//Haku kaikki
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const blogById = await Blog.findById(req.params.id).populate('user', {
    username: 1,
    name: 1,
  });

  if (blogById) {
    res.json(blogById);
  } else {
    res.end();
  }
});

//Lisäys
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

//Muokkaus
blogsRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.status(200).json(updBlog);
});

//Poisto
blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(400).json({ error: 'object does not exist in database' });
  }

  if (blog.user.toString() === user._id.toString()) {
    user.blogs = user.blogs.filter((obj) => obj.toString() !== blog.id.toString());
    await user.save();

    await blog.deleteOne();

    res.status(204).end();
  } else {
    res.status(401).json({ error: 'invalid token' });
  }
});

module.exports = blogsRouter;
