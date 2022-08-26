/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Login the Sportify dashboard.
         * @example
         * cy.LoginUI()
         */
         LoginUI(): Chainable<any>

    }
}