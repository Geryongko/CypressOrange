import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/login-page';
import DashboardPage from '../pages/dashboard-page';
import AdminPage from '../pages/admin-page';

Given('I open the OrangeHRM login page', () => {
  LoginPage.visit();
});

When('I log in using the {string} fixture credentials', (credentialSet) => {
  cy.fixture('credentials').then((credentials) => {
    expect(credentialSet).to.equal('admin');
    LoginPage.login(credentials.username, credentials.password);
  });
});

Given('I log in with the {string} fixture credentials', (credentialSet) => {
  cy.fixture('credentials').then((credentials) => {
    expect(credentialSet).to.equal('admin');
    LoginPage.login(credentials.username, credentials.password);
  });
});

When('I log in with an invalid password from the fixture', () => {
  cy.fixture('credentials').then((credentials) => {
    LoginPage.login(credentials.username, credentials.invalidPassword);
  });
});

Then('the dashboard is displayed', () => {
  DashboardPage.assertVisible();
});

Then('an invalid credentials message is displayed', () => {
  LoginPage.assertInvalidCredentials();
});

When('I open the Admin menu', () => {
  AdminPage.openFromSidebar();
});

Then('the Admin user management page is displayed', () => {
  AdminPage.assertUserManagementVisible();
});

When('I add a user with username prefix {string} and role {string}', function (usernamePrefix, role) {
  const username = `${usernamePrefix}_${Date.now()}`;
  this.createdUsername = username;
  cy.fixture('credentials').then((credentials) => {
    AdminPage.addUser(username, role, credentials.password);
  });
});

Then('the created user is listed', function () {
  AdminPage.searchForUser(this.createdUsername);
});
