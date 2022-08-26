// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('LoginUI', () => {
    cy.visit('/');
    cy.get('[data-cy="LogIn"]').click();
    cy.url().should('include', '/auth');
    cy.get('[data-cy="email"]').type("test@gmail.com")
    cy.get('[data-cy="password"]').type("test")
    cy.get('[data-cy="login/signup-submit"]').click();
    cy.url().should('include', "manage");
})