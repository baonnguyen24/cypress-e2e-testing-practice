describe('Newsletter', () => {
    beforeEach(() => {
        // Refresh database for every test run
        cy.task('seedDatabase');
    });

    it('should display a success message', () => {
        // Intercept Spy: listening to a request
        cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe'); // intercept HTTP request to localhost:3000/newsletter......
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('jo@g.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe');
        cy.contains('Thanks for signing up!');
    });

    it('should display validation error', () => {
        // Intercept Stub: fake a request message
        cy.intercept('POST', '/newsletter*', { message: 'Email existed' }).as('subscribe'); // intercept HTTP request to localhost:3000/newsletter......
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('jo@g.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe');
        cy.contains('Email existed');
    });

    it.only('should sucessdfully create a new contact', () => {
        // Test API endpoint
        cy.request({
            method: 'POST',
            url: '/newsletter',
            body: {email: 'test@sample.com'},
            form: true
        }).then(res => {
            expect(res.status).to.eq(201);
        });
    });
});