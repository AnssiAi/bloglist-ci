const dummy = (blogs) => {
  return blogs ? 1 : 0;
};

const totalLikes = (blogs) => {
  //0 = initialvalue, pakko olla jos käsittelee objekteja
  //currentvalue pystyy ottamaan objektin ominaisuuden
  return blogs.length === 0
    ? 0
    : blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0);
};

const favoriteBlog = (blogs) => {
  //reducer saa kaksi objektia listassa edeltävän ja tämänhetkisen
  const reducer = (prev, current) => {
    return prev.likes > current.likes ? prev : current;
  };

  const foundObject = blogs.length === 0 ? null : blogs.reduce(reducer, 0);

  const returnObject = {
    title: foundObject.title,
    author: foundObject.author,
    likes: foundObject.likes,
  };

  return returnObject;
};

const mostBlogs = (blogs) => {
  //Muutetaan lista objektiksi joka sisältää nimen ja lukumäärän
  const count = blogs.reduce((acc, curr) => {
    const auth = curr.author;
    acc[auth] = (acc[auth] || 0) + 1;
    return acc;
  }, {});

  //Muutetaan objektin propertyt listaksi, jossa jokainen property on lista
  const authList = Object.entries(count);

  //Vertaillaan listan arvoja
  const highestCount = authList.reduce((acc, curr) => {
    return acc[1] > curr[1] ? acc : curr;
  }, 0);

  //Luodaan palautettava objekti
  const returnObject = {
    author: highestCount[0],
    blogs: highestCount[1],
  };

  return returnObject;
};

const mostLikes = (blogs) => {
  const object = blogs.reduce((acc, curr) => {
    const auth = curr.author;
    const add = curr.likes;

    acc[auth] = (acc[auth] || 0) + add;

    return acc;
  }, {});

  const listObject = Object.entries(object);

  const highestLikes = listObject.reduce((acc, curr) => {
    return acc[1] > curr[1] ? acc : curr;
  }, 0);

  const returnObject = {
    author: highestLikes[0],
    likes: highestLikes[1],
  };
  return returnObject;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
