import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './CreateBlogForm';

describe('create blog form', () => {
  test('return function called with correct information', async () => {
    const user = userEvent.setup();
    const mockBlog = jest.fn();

    const { container } = render(<BlogForm addBlog={mockBlog} />);

    const title = container.querySelector('#title');
    const author = container.querySelector('#author');
    const url = container.querySelector('#url');
    const sendButton = screen.getByText('create');

    await user.type(title, 'form test');
    await user.type(author, 'dev');
    await user.type(url, 'this');

    await user.click(sendButton);

    expect(mockBlog.mock.calls).toHaveLength(1);
    expect(mockBlog.mock.calls[0][0].title).toBe('form test');
    expect(mockBlog.mock.calls[0][0].author).toBe('dev');
    expect(mockBlog.mock.calls[0][0].url).toBe('this');
  });
});
