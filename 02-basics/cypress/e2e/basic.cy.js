describe('task page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173');
    cy.get('.main-header img').should('exist');
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:5173')
    cy.get('.main-header h1').contains('React Tasks');
  });
});