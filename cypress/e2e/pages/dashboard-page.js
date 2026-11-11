class DashboardPage {
  assertVisible() {
    cy.location('pathname').should('include', '/dashboard');
    cy.get('h6').should('be.visible').and('have.text', 'Dashboard');
  }
}

export default new DashboardPage();
