import exampleData from '../../fixtures/example.json';

describe('Personal page - Amount filter', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signin');
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('input[name="password"]').type(exampleData.password);
        cy.get('.PrivateSwitchBase-input-14').click();
        cy.get('[data-test="signin-submit"]').click();
    });

    it('Create Multiple transactions and validate amount filter', () => {
        const numberOfTransactions = 5;

        for (let i = 0; i < numberOfTransactions; i++) {
            cy.get('[data-test="nav-top-new-transaction"]').click();
            cy.get('[data-test="user-list-item-uBmeaz5pX"]').click({ force: true });
            const amount = 498 + i;
            cy.get('#amount').type(`${amount}`);
            cy.get('#transaction-create-description-input').type(`Trans ${i + 1}`);
            cy.get('[data-test="transaction-create-submit-payment"]').click();
            cy.get('[data-test="new-transaction-return-to-transactions"]').click();
        }
        
        cy.get('[data-test="nav-personal-tab"]').click();
        cy.get('[data-test="transaction-list-filter-amount-range-button"]').click({ force: true });
        cy.get('.MuiSlider-track').click();

        cy.contains('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12', 'Trans 1').should('exist');
        cy.contains('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12', 'Trans 2').should('exist');
        cy.contains('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12', 'Trans 3').should('exist');
        cy.contains('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12', 'Trans 4').should('not.exist');
        cy.contains('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12', 'Trans 5').should('not.exist');
    });
});