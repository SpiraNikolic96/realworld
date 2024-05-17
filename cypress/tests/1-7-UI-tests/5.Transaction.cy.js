import exampleData from '../../fixtures/example.json';

describe('Transaction creation', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signin');
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('input[name="password"]').type(exampleData.password);
        cy.get('.PrivateSwitchBase-input-14').click();
        cy.get('[data-test="signin-submit"]').click();
    });

    it('Create and complete transaction', () => {
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test="user-list-item-uBmeaz5pX"]').click({ force: true });
        cy.get('#amount').type('1000');
        cy.get('#amount').should('have.value', '$1,000');
        cy.get('#transaction-create-description-input').type('Borrowing');
        cy.get('[data-test="transaction-create-submit-payment"]').click();
        cy.wait(1000);
        cy.xpath('//h2[normalize-space()="Paid $1,000.00 for Borrowing"]').should('be.visible');
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();
    });
});