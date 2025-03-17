const listHelper = require('../utils/list_helper');
const helper = require('./test_helper');

test('dummy returns one', () => {
  const result = listHelper.dummy(helper.listWithZero);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(helper.listWithZero);
    expect(result).toBe(0);
  });

  test('when list has only one blog equal the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOne);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.testBlogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('with highest number of likes', () => {
    const testFavorite = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    const result = listHelper.favoriteBlog(helper.testBlogs);
    console.log(result);
    expect(result).toEqual(testFavorite);
  });
});

describe('most blogs', () => {
  test('author with most blogs', () => {
    const testCase = {
      author: 'Robert C. Martin',
      blogs: 3,
    };

    const result = listHelper.mostBlogs(helper.testBlogs);
    console.log(result);
    expect(result).toEqual(testCase);
  });
});

describe('most likes', () => {
  test('author with most likes', () => {
    const testCase = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };

    const result = listHelper.mostLikes(helper.testBlogs);
    console.log(result);
    expect(result).toEqual(testCase);
  });
});
