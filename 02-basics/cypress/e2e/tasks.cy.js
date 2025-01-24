describe('Task Management', () => {
    it('should open and close the new task modal when clicking outside', () => {
        cy.visit('http://localhost:5173/');
        cy.get('[data-cy="start-add-task-button"]').click();
        cy.get('.backdrop').click({ force: true });
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should close the new task modal if user cancels', () => {
        cy.visit('http://localhost:5173');
        cy.get('[data-cy="start-add-task-button"]').click();
        cy.get('.modal').should('exist');
        cy.get('button').contains('Cancel').click();
        cy.get('.modal').should('not.exist');
    });

    it('should be able to create a new task', () => {
        cy.visit('http://localhost:5173');
        cy.get('[data-cy="start-add-task-button"]').click();
        cy.get('.modal').should('exist');
        cy.get('input[id="title"]').type('Test Title');
        cy.get('textarea[id="summary"]').type('Test summary');
        cy.get('button[type="submit"]').click();
        cy.get('.task-list').should('have.length', 1);
        cy.get('.task h2').contains('Test Title');
        cy.get('.task p').contains('Test summary');
        cy.get('.modal').should('not.exist');
    });

    it('should validate user input', () => {
        cy.visit('http://localhost:5173');
        cy.get('[data-cy="start-add-task-button"]').click();
        cy.get('.modal').should('exist');
        cy.get('input[id="title"]').type('Test Title');
        cy.get('button[type="submit"]').click();
        cy.get('.error-message').contains('Please provide values');
    });

    it('should filter tasks', () => {
        cy.visit('http://localhost:5173');

        // create test data
        cy.get('[data-cy="start-add-task-button"]').click();
        cy.get('.modal').should('exist');
        cy.get('#title').type('Dropdown test');
        cy.get('#summary').type('testing dropdown for urgent tier');
        cy.get('#category').select('urgent');
        cy.get('button[type="submit"]').click();

        // validate true
        cy.get('#filter').select('urgent');
        cy.get('.task-list').should('have.length', 1);
        cy.get('.task h2').contains('Dropdown test');
        cy.get('.task p').contains('testing dropdown for urgent tier');

        // validate false
        cy.get('#filter').select('important');
        cy.get('.task-list').should('have.length', 0);
    });
});