describe('Auth', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('signup', () => {
        cy.visit('/signup');
        cy.get('[data-cy="auth-email"]').click();
        cy.get('[data-cy="auth-email"]').type('gale@g.com');
        cy.get('[data-cy="auth-password"]').type('justfortest');
        cy.get('[data-cy="auth-submit"]').click();
        cy.location('pathname').should('eq','/takeaways');
        cy.getCookie('__session').its('value').should('not.be.empty');
    });

    it('should login', () => {
        cy.login();
    });

    it('should logout', () => {
        cy.login();
        cy.contains('Logout').click();
        cy.location('pathname').should('eq','/');
        cy.getCookie('__session').its('value').should('be.empty');
    });
});