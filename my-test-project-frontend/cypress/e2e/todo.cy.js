
describe('Todo App', () => {
  it('logs in and manages items', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Login').click();
    cy.get('input').type('Test Item');
    cy.contains('Add').click();
    cy.contains('Test Item');
    cy.contains('Delete').click();
    cy.contains('Test Item').should('not.exist');
  });
});
