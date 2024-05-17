import exampleData from '../../fixtures/example.json';

describe('Bank Account page', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signin');
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('input[name="password"]').type(exampleData.password);
        cy.get('.PrivateSwitchBase-input-14').click();
        cy.get('[data-test="signin-submit"]').click();
    });

    it('Create Bank account', () => {
        cy.get('[data-test="sidenav-bankaccounts"]').click();
        cy.get('[data-test="bankaccount-new"]').scrollIntoView().click();
        cy.get('input[name="bankName"]').type('New Bank account');
        cy.get('input[name="routingNumber"]').type('123456789');
        cy.get('input[name="accountNumber"]').type('1234567890');
        cy.get('[data-test="bankaccount-submit"]').click();
        cy.get('[data-test="bankaccount-list"]').should('be.visible').and('contain', 'New Bank account');
    });
});