describe('test contact form', () => {
    it('should submit the form', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').type("body message");
        cy.get('[data-cy="contact-input-name"]').type('my name');
        cy.get('[data-cy="contact-input-email"]').type('my_name@mail.com');
        //Normal way to assert the button
        cy.get('[data-cy="contact-btn-submit"]').as('submitButton');
        cy.get('@submitButton').click();
        cy.get('@submitButton').contains('Sending...');
        cy.get('@submitButton').should('have.attr', 'disabled');
    });

    it('should submit the form when hitting Enter', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').type("body message");
        cy.get('[data-cy="contact-input-name"]').type('my name');
        // Another way to assert the button
        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.eq('Send Message');
        });
        // use {enter} to simulate keystroke
        cy.get('[data-cy="contact-input-email"]').type('my_name@mail.com{enter}');
        cy.get('[data-cy="contact-btn-submit"]').as('submitButton');
        cy.get('@submitButton').contains('Sending...');
        cy.get('@submitButton').should('have.attr', 'disabled');
    });

    it.only('should validate form input', () => {
        cy.visit('http://localhost:5173/about');

        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el).to.not.have.attr('disabled');
            expect(el.text()).to.not.equal('Sending...');
        });
        cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');

        //Check invalid message
        cy.get('[data-cy="contact-input-message"]').as('inputMessage');
        cy.get('@inputMessage').focus().blur();
        cy.get('@inputMessage').parent().then((el) => {
            expect(el.attr('class')).to.contains('invalid');
        });

        // Another way to assert without using .then()
        cy.get('[data-cy="contact-input-name"]').as('inputName');
        cy.get('@inputName').focus().blur();
        cy.get('@inputName').parent().should('have.attr', 'class').and('match', /invalid/); // /invalid/ here is a regex, means "contain the word "invalid""

        // Can also use anonymous function with .should()
        cy.get('[data-cy="contact-input-email"]').as('inputEmail');
        cy.get('@inputEmail').focus().blur();
        cy.get('@inputEmail').parent().should((el) => {
            expect(el.attr('class')).contains('invalid');
        });

    });
});