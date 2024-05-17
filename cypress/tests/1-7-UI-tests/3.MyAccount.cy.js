import exampleData from '../../fixtures/example.json';

describe('My Account page', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signin')
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('input[name="password"]').type(exampleData.password);
        cy.get('.PrivateSwitchBase-input-14').click();
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible').and('contain', 'Get Started with Real World App');
    });

    it('Change account information and validating new one', () => {
        cy.get('[data-test="user-onboarding-next"]').click();
        cy.get('#bankaccount-bankName-input').type('123456789');
        cy.get('#bankaccount-routingNumber-input').type('123456789');
        cy.get('#bankaccount-accountNumber-input').type('123456789');
        cy.get('[data-test="bankaccount-submit"]').click();
        cy.get('[data-test="user-onboarding-next"]').click();
        cy.get('[data-test="sidenav-user-settings"]').click();


        cy.get('input[name="firstName"]').clear().type('NewName');
        cy.get('input[name="lastName"]').clear().type('NewLastName');
        cy.get('input[name="email"]').clear().type('NewLastName@test.com');
        cy.get('input[name="phoneNumber"]').clear().type('123456789');
        cy.get('[data-test="user-settings-submit"]').click();
        cy.get('[data-test="sidenav-home"]').click();
        cy.get('[data-test="sidenav-user-settings"]').click();

        cy.get('input[name="firstName"]').should('have.value', 'NewName');
        cy.get('input[name="lastName"]').should('have.value', 'NewLastName');
        cy.get('input[name="email"]').should('have.value', 'NewLastName@test.com');
        cy.get('input[name="phoneNumber"]').should('have.value', '123456789');
    });
});