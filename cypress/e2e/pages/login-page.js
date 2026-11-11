class LoginPage {
  visit() {
    cy.visit('/web/index.php/auth/login');
  }

  login(username, password) {
    cy.get('input[name="username"]').should('be.visible').clear().type(username);
    cy.get('input[name="password"]').should('be.visible').clear().type(password, {
      log: false,
    });
    cy.get('button[type="submit"]').click();
  }

  assertInvalidCredentials() {
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
    cy.screenshot('invalid-login-rejected', { capture: 'viewport' });
  }
}

export default new LoginPage();
