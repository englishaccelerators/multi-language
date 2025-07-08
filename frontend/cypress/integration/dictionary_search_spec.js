
describe('Dictionary Search', () => {
  it('loads the homepage and searches for a word', () => {
    cy.visit('/');
    cy.get('input[placeholder="Search"]').type('run');
    cy.contains('run').should('exist');
    cy.contains('verb').should('exist');
  });
});
