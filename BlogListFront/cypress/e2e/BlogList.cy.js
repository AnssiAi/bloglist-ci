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
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });
});
