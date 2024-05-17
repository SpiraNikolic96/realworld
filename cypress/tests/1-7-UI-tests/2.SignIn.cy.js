import exampleData from '../../fixtures/example.json';

describe('Sign In form validation', function () {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signin')
    });

    it('Case for all empty fields', () => {
        cy.get('[data-test="signin-submit"]').click();
        cy.get('#username-helper-text').should('be.visible').and('contain', 'Username is required');
    })

    it('Fill only Username', () => {
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('[data-test="signin-submit"]').should('be.disabled');
    });

    it('Try to sign in with empty password', () => {
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('.PrivateSwitchBase-input-14').click();
        cy.get('[data-test="signin-submit"]').should('be.disabled');
    });

    it('Try to sign in with empty username', () => {
        cy.get('input[name="password"]').type(exampleData.password);
        cy.get('.PrivateSwitchBase-input-14').click();
        cy.get('[data-test="signin-submit"]').should('be.disabled');
    });

    it('Try to click on logo', () => {
        cy.get('.makeStyles-paper-2 > :nth-child(1)').click();
        cy.get('.makeStyles-paper-2 > :nth-child(1)').should('not.be.enabled');
    });

    it('Click on "Dont have an account? Sign up"', () => {
        cy.get('.MuiGrid-root > a').click();
        cy.url().should('include', '/signup');
    });

    it('Sign in with unvalid data', () => {
        cy.get('input[name="username"]').type(exampleData.password);
        cy.get('input[name="password"]').type(exampleData.userName);
        cy.get('.PrivateSwitchBase-input-14').click();
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="signin-error"]').should('be.visible').and('contain', 'Username or password is invalid');
    });

    it('Sign in with number data', () => {
        cy.get('input[name="username"]').type('1234');
        cy.get('input[name="password"]').type('1234');
        cy.get('.PrivateSwitchBase-input-14').click();
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible').and('contain', 'Get Started with Real World App');
    });

    it('Sign in with valid data', () => {
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('input[name="password"]').type(exampleData.password);
        cy.get('.PrivateSwitchBase-input-14').click();
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible').and('contain', 'Get Started with Real World App');
    });
});