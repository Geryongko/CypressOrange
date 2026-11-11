class DashboardPage {
  assertVisible() {
    cy.location('pathname').should('include', '/dashboard');
    cy.get('h6').should('be.visible').and('have.text', 'Dashboard');
    cy.screenshot('dashboard-validation', { capture: 'viewport' });
  }
}

export default new DashboardPage();
