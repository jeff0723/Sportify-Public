describe("Test", () => {
    beforeEach('Visit homepage', () => {
        cy.visit('/home-page');
    })
    it("Test Login", () => {
        cy.get('[data-cy="LogIn"]').click();
        cy.url().should('include', '/auth');
        cy.get('[data-cy="email"]').type("test@gmail.com")
        cy.get('[data-cy="password"]').type("test")
        cy.get('[data-cy="login/signup-submit"]').click();
        cy.url().should('include', "manage");

    })
    it("Bulletin visible", () => {
        cy.get('[data-cy="carousel"]').should('be.visible')
        cy.get('[data-cy="carousel-title"]').should('be.visible');
        cy.get('[data-cy="carousel-highlight"]').should('be.visible');
        cy.get('[data-cy="carousel-button"]')
            .should('contain', 'REGISTER NOW')
            .click()
            .url().should('contain', 'event');


    })
    it("Check event card", () => {
        cy.get('[data-cy="all-events"]').should('be.visible');
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get('[data-cy="event-card"]').then((cardlist) => {
            const randomCard = cardlist[Math.floor(Math.random() * cardlist.length)];
            cy.wrap(randomCard).scrollIntoView();
            cy.wrap(randomCard)
                .get('img')
                .should('exist')
                .and('be.visible');
            cy.wrap(randomCard)
                .get('[data-cy="event-title"]')
                .should('exist')
                .and('be.visible');
            cy.wrap(randomCard)
                .get('[data-cy="event-description"]')
                .should('exist')
                .and('be.visible');
            cy.wrap(randomCard)
                .click()
                .url()
                .should('contain', 'event');
            cy.go(-1);
            // eslint-disable-next-line jest/valid-expect-in-promise
            cy.get('[data-cy="more-info"]').then(($info) => {
                const info = $info[Math.floor(Math.random() * cardlist.length)];
                cy.wrap(info)
                    .click()
                    .url()
                    .should('contain', 'event');
            })

        })
    })

})