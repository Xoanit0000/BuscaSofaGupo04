// Prueba e2e de la página de perfil de usuario (/perfil).
// Verifica tanto el caso sin sesión como el caso con un usuario autenticado.

describe('Página de perfil de usuario', () => {
  it('muestra un aviso e invita a iniciar sesión cuando no hay sesión', () => {
    cy.clearLocalStorage();
    cy.visit('/perfil');

    cy.contains('h2', 'Perfil de usuario').should('be.visible');
    cy.contains('No has iniciado sesión').should('be.visible');
    cy.get('a[href="/login"]').should('exist');
  });

  it('muestra el nombre del usuario autenticado a partir del token', () => {
    cy.visit('/perfil', {
      onBeforeLoad(win) {
        const payload = win.btoa(JSON.stringify({ username: 'sofauser' }));
        win.localStorage.setItem('token', `header.${payload}.firma`);
      },
    });

    cy.contains('h2', 'Perfil de usuario').should('be.visible');
    cy.get('.profile-username').should('contain.text', 'sofauser');
  });
});
