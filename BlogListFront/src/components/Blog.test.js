import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const testUser = {
  username: 'TestUser',
};

const testBlog = {
  title: 'Component testing',
  author: 'Developer',
  url: 'console',
  likes: 12,
  user: testUser,
};

describe('Blog', () => {
  let mockLikes = jest.fn();

  let container;

  beforeEach(() => {
    container = render(<Blog blog={testBlog} updLikes={mockLikes} />).container;
  });

  test('renders only title by default', () => {
    const div = container.querySelector('.blog');
    const hiddenDiv = container.querySelector('.hiddenContent');

    expect(div).toHaveTextContent(`${testBlog.title}`);
    expect(hiddenDiv).toHaveStyle('display: none');
  });

  test('render url and likes', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const div = container.querySelector('.hiddenContent');
    expect(div).not.toHaveStyle('display: none');
    expect(div).toHaveTextContent(`${testBlog.url}`);
    expect(div).toHaveTextContent(`${testBlog.likes}`);
    expect(div).toHaveTextContent(`${testBlog.user.username}`);
  });

  test('like function called twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('like');
    await user.click(button);
    await user.click(button);

    expect(mockLikes.mock.calls).toHaveLength(2);
  });
});
