//Ei nuolifunktioita!
const testUser = {
  username: 'olenTesti',
  name: 'devaaja',
  password: 'salainen',
};
const secondUser = {
  username: 'toinenTestaaja',
  name: 'selaaja',
  password: 'kokeilu',
};
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', testUser);
    cy.request('POST', 'http://localhost:3003/api/users', secondUser);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(`${testUser.username}`);
      cy.get('#password').type(`${testUser.password}`);
      cy.get('#login-btn').click();
      cy.contains(`logged in as: ${testUser.username}`);
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type(`${testUser.username}`);
      cy.get('#password').type('vääräsana');
      cy.get('#login-btn').click();
      cy.get('.error').contains('wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: `${testUser.username}`, password: `${testUser.password}` });
    });

    it('A blog can be created', function () {
      cy.contains('create new').click();
      cy.get('#title').type('E2E testi Cypress avulla');
      cy.get('#author').type('devaaja');
      cy.get('#url').type('this');
      cy.get('#create-btn').click();

      cy.get('.blog').contains('E2E testi Cypress avulla');
    });

    describe('Blog operation', function () {
      beforeEach(function () {
        cy.contains('create new').click();
        cy.get('#title').type('E2E testi Cypress avulla');
        cy.get('#author').type('devaaja');
        cy.get('#url').type('this');
        cy.get('#create-btn').click();
      });

      it('A blog can be liked', function () {
        cy.get('.blog').contains('E2E testi Cypress avulla').contains('view').click();
        cy.get('.hiddenContent').contains('like').click();
        cy.get('.hiddenContent').contains('likes: 1');
      });

      it('A blog can be deleted', function () {
        cy.get('.blog').contains('E2E testi Cypress avulla').contains('view').click();
        cy.get('.authorizedContent').contains('remove').click();

        cy.contains('E2E testi Cypress avulla').should('not.exist');
      });
    });
    describe('Unauthorized user', function () {
      beforeEach(function () {
        //Blogi
        cy.createBlog({
          title: 'oikeuskoe',
          author: 'devaaja',
          url: 'tämä',
        });

        //Kirjautuminen toisena
        cy.login({
          username: `${secondUser.username}`,
          password: `${secondUser.password}`,
        });
      });

      it('Blog is found', function () {
        cy.get('.blog').contains('oikeuskoe');
      });

      it('Remove button not visible', function () {
        cy.get('.blog').contains('oikeuskoe').contains('view').click();
        cy.contains('oikeuskoe').contains('remove').should('not.exist');
      });
    });
    //Multiple blogs
    describe('Multiple blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Kaksi lensi',
          author: 'devaaja',
          url: 'tämä',
          likes: 3,
        });
        cy.createBlog({
          title: 'Minä sekä hän',
          author: 'devaaja',
          url: 'tämä',
          likes: 4,
        });
        cy.createBlog({
          title: 'Kun napaan jää tequilaa',
          author: 'devaaja',
          url: 'tämä',
          likes: 6,
        });
      });

      it('Blogs are displayed in order of likes', function () {
        cy.get('.blog').eq(0).should('contain', 'Kun napaan jää tequilaa');
        cy.get('.blog').eq(1).should('contain', 'Minä sekä hän');
        cy.get('.blog').eq(2).should('contain', 'Kaksi lensi');
      });
    });
  });
});
