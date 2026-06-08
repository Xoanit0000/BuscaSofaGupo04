/// <reference types="cypress" />

describe('Visualización de la página About', () => {
    beforeEach(() => {
        cy.visit('/about');
    });

    it('Se muestra el número de equipo correcto (04)', () => {
        cy.get('div#info')
            .should('exist')
            .should('contain.text', '04');
    });

    it('Se muestran exactamente 5 tarjetas de miembros del equipo', () => {
        cy.get('[data-cy="team-grid"]')
            .should('exist');
        cy.get('[data-cy="member-card"]')
            .should('have.length', 5);
    });

    it('Se muestra la tarjeta de Margarita Fernández García con rol Programadora', () => {
        cy.get('[data-cy="member-card"]').contains('Margarita Fernández García')
            .closest('[data-cy="member-card"]')
            .within(() => {
                cy.get('.member-name').should('have.text', 'Margarita Fernández García');
                cy.get('.member-role').should('have.text', 'Programadora');
                cy.get('.member-bio').should('contain.text', 'App.jsx');
                cy.get('.member-avatar').should('have.text', 'MF');
            });
    });

    it('Se muestra la tarjeta de Pablo Bourdelande García con rol Jefe de Proyecto', () => {
        cy.get('[data-cy="member-card"]').contains('Pablo Bourdelande García')
            .closest('[data-cy="member-card"]')
            .within(() => {
                cy.get('.member-name').should('have.text', 'Pablo Bourdelande García');
                cy.get('.member-role').should('have.text', 'Jefe de Proyecto');
                cy.get('.member-bio').should('contain.text', 'Header.jsx');
                cy.get('.member-avatar').should('have.text', 'PB');
            });
    });

    it('Se muestra la tarjeta de Juan María Pàmies García con rol Programador', () => {
        cy.get('[data-cy="member-card"]').contains('Juan María Pàmies García')
            .closest('[data-cy="member-card"]')
            .within(() => {
                cy.get('.member-name').should('have.text', 'Juan María Pàmies García');
                cy.get('.member-role').should('have.text', 'Programador');
                cy.get('.member-bio').should('contain.text', 'About');
                cy.get('.member-avatar').should('have.text', 'JM');
            });
    });

    it('Se muestra la tarjeta de Carlos Torres Cid con rol Programador', () => {
        cy.get('[data-cy="member-card"]').contains('Carlos Torres Cid')
            .closest('[data-cy="member-card"]')
            .within(() => {
                cy.get('.member-name').should('have.text', 'Carlos Torres Cid');
                cy.get('.member-role').should('have.text', 'Programador');
                cy.get('.member-bio').should('contain.text', 'NotFound');
                cy.get('.member-avatar').should('have.text', 'CT');
            });
    });

    it('Se muestra la tarjeta de Álvaro López Morales con rol Director del Proyecto', () => {
        cy.get('[data-cy="member-card"]').contains('Álvaro López Morales')
            .closest('[data-cy="member-card"]')
            .within(() => {
                cy.get('.member-name').should('have.text', 'Álvaro López Morales');
                cy.get('.member-role').should('have.text', 'Director del Proyecto');
                cy.get('.member-bio').should('contain.text', 'perfil');
                cy.get('.member-avatar').should('have.text', 'ÁL');
            });
    });

    it('Cada tarjeta muestra nombre, rol, bio y avatar con iniciales', () => {
        cy.get('[data-cy="member-card"]').each(($card) => {
            cy.wrap($card).find('.member-name').should('not.be.empty');
            cy.wrap($card).find('.member-role').should('not.be.empty');
            cy.wrap($card).find('.member-bio').should('not.be.empty');
            cy.wrap($card).find('.member-avatar').should('not.be.empty');
        });
    });
});
