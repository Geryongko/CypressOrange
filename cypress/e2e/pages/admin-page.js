class AdminPage {
  openFromSidebar() {
    cy.contains('a.oxd-main-menu-item', 'Admin').click();
  }

  assertUserManagementVisible() {
    cy.location('pathname').should('include', '/admin/viewSystemUsers');
    cy.get('h6').should('be.visible').and('contain.text', 'Admin');
    cy.contains('button', 'Add').should('be.visible');
    cy.get('.oxd-table-row').should('have.length.greaterThan', 0);
    cy.screenshot('admin-user-management', { capture: 'viewport' });
  }

  addUser(username, role, password) {
    cy.contains('button', 'Add').click();
    cy.get('h6').should('contain.text', 'Add User');

    this.selectDropdownOption('User Role', role);
    this.selectDropdownOption('Status', 'Enabled');

    this.fieldGroup('Employee Name')
      .find('input[placeholder="Type for hints..."]')
      .type('a');
    cy.get('.oxd-autocomplete-option')
      .should(($options) => {
        expect($options.length).to.be.greaterThan(0);
        expect($options.text()).not.to.match(/Searching|No Records Found/i);
      })
      .first()
      .click();
    this.fieldGroup('Employee Name')
      .find('input[placeholder="Type for hints..."]')
      .should('not.have.value', 'a');

    this.fieldGroup('Username').find('input').type(username);
    this.fieldGroup('Password').find('input').type(password, { log: false });
    this.fieldGroup('Confirm Password').find('input').type(password, { log: false });
    cy.contains('button', 'Save').click();
    cy.get('.oxd-toast').should('be.visible').and('contain.text', 'Success');
  }

  searchForUser(username) {
    cy.location('pathname').should('include', '/admin/viewSystemUsers');
    cy.contains('button', 'Search').should('be.visible');
    this.fieldGroup('Username').find('input').should('be.visible').clear();
    this.fieldGroup('Username').find('input').should('be.visible').type(username);
    cy.contains('button', 'Search').click();
    cy.contains('.oxd-table-row', username).should('be.visible');
    cy.screenshot(`created-${username.split('_')[0]}`, { capture: 'viewport' });
  }

  fieldGroup(label) {
    return cy.contains('.oxd-input-group label', label).closest('.oxd-input-group');
  }

  selectDropdownOption(label, option) {
    this.fieldGroup(label).find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown')
      .contains('.oxd-select-option', option)
      .should('be.visible')
      .click();
  }
}

export default new AdminPage();
