import exampleData from '../../fixtures/example.json';

describe('Personal page', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signin');
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('input[name="password"]').type(exampleData.password);
        cy.get('.PrivateSwitchBase-input-14').click();
        cy.get('[data-test="signin-submit"]').click();
    });

    it('Validate transaction on Personal page', () => {
        cy.get('[data-test="nav-personal-tab"]').click();
        cy.url().should('include', '/personal');
        cy.contains('.MuiTypography-root', 'Borrowing').should('exist');
    });
});