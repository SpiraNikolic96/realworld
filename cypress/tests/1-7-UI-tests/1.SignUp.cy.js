import exampleData from '../../fixtures/example.json';

describe('Sign Up form validation', function () {

    beforeEach(() => {
        cy.visit('http://localhost:3000/signup')
    })

    it('Case for all empty fields', () => {
        cy.get('[data-test="signup-submit"]').click();
        cy.get('#firstName-helper-text').should('be.visible').and('contain', 'First Name is required');
    })

    it('Fill only First Name', () => {
        cy.get('input[name="firstName"]').type(exampleData.firstName);
        cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it('Check all validation messages', () => {
        cy.get('input[name="firstName"]').click();
        cy.get('input[name="lastName"]').click();
        cy.get('#firstName-helper-text').should('be.visible').and('contain', 'First Name is required');
        cy.get('input[name="username"]').click();
        cy.get('#lastName-helper-text').should('be.visible').and('contain', 'Last Name is required');
        cy.get('input[name="password"]').click();
        cy.get('#username-helper-text').should('be.visible').and('contain', 'Username is required');
        cy.get('input[name="confirmPassword"]').click();
        cy.get('#password-helper-text').should('be.visible').and('contain', 'Enter your password');
        cy.get('input[name="firstName"]').click();
        cy.get('#confirmPassword-helper-text').should('be.visible').and('contain', 'Confirm your password');
        cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it('Fill all fields', () => {
        cy.get('input[name="firstName"]').type(exampleData.firstName);
        cy.get('input[name="lastName"]').type(exampleData.lastName);
        cy.get('#firstName-helper-text').should('not.exist');
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('#lastName-helper-text').should('not.exist');
        cy.get('input[name="password"]').type(exampleData.password);
        cy.get('#username-helper-text').should('not.exist');
        cy.get('input[name="confirmPassword"]').type(exampleData.password);
        cy.get('#password-helper-text').should('not.exist');
        cy.get('#confirmPassword-helper-text').should('not.exist');
        cy.get('[data-test="signup-submit"]').should('be.enabled');
    });

    it('Submit button is enabled only if all fields are filled in', () => {
        cy.get('input[name="firstName"]').type(exampleData.firstName);
        cy.get('[data-test="signup-submit"]').should('be.disabled');
        cy.get('input[name="lastName"]').type(exampleData.lastName);
        cy.get('[data-test="signup-submit"]').should('be.disabled');
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('[data-test="signup-submit"]').should('be.disabled');
        cy.get('input[name="password"]').type(exampleData.password);
        cy.get('[data-test="signup-submit"]').should('be.disabled');
        cy.get('input[name="confirmPassword"]').type(exampleData.password);
        cy.get('[data-test="signup-submit"]').should('be.enabled');
    });

       it('Password must contain at least 4 characters', () => {
        cy.get('input[name="firstName"]').type(exampleData.firstName);
        cy.get('input[name="lastName"]').type(exampleData.lastName);
        cy.get('#firstName-helper-text').should('not.exist');
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('#lastName-helper-text').should('not.exist');
        cy.get('input[name="password"]').type('123');
        cy.get('#username-helper-text').should('not.exist');
        cy.get('#password-helper-text').should('be.visible').and('contain', 'Password must contain at least 4 characters');
    });

    it('Password does not match', () => {
        cy.get('input[name="firstName"]').type(exampleData.firstName);
        cy.get('input[name="lastName"]').type(exampleData.lastName);
        cy.get('#firstName-helper-text').should('not.exist');
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('#lastName-helper-text').should('not.exist');
        cy.get('input[name="password"]').type('123');
        cy.get('#username-helper-text').should('not.exist');
        cy.get('#password-helper-text').should('be.visible').and('contain', 'Password must contain at least 4 characters');
        cy.get('input[name="confirmPassword"]').type('12');
        cy.get('#confirmPassword-helper-text').should('be.visible').and('contain', 'Password does not match');
    });

    it('Try to click on logo', () => {
        cy.get('.makeStyles-paper-2 > :nth-child(1)').click();
        cy.get('.makeStyles-paper-2 > :nth-child(1)').should('not.be.enabled');
    });

    it('Click on "Have an account? Sign in"', () => {
        cy.get('.MuiGrid-root > a').click();
        cy.url().should('include', '/signin');
    });

    it('Registration with numbers as inputs data', () => {
        cy.get('input[name="firstName"]').type('1234');
        cy.get('input[name="lastName"]').type('1234');
        cy.get('input[name="username"]').type('1234');
        cy.get('input[name="password"]').type('1234');
        cy.get('input[name="confirmPassword"]').type('1234');
        cy.get('[data-test="signup-submit"]').click();
        cy.url().should('include', '/signin');
    });

    it('Registration with valid input data', () => {
        cy.get('input[name="firstName"]').type(exampleData.firstName);
        cy.get('input[name="lastName"]').type(exampleData.lastName);
        cy.get('input[name="username"]').type(exampleData.userName);
        cy.get('input[name="password"]').type(exampleData.password);
        cy.get('input[name="confirmPassword"]').type(exampleData.password);
        cy.get('[data-test="signup-submit"]').click();
        cy.url().should('include', '/signin');
    });     
});