Feature: Login and Add Multiple Admins

  Background:
    Given I open the OrangeHRM login page

  Scenario Outline: Valid login reaches the dashboard
    When I log in using the "<credentialSet>" fixture credentials
    Then the dashboard is displayed

    Examples:
      | credentialSet |
      | admin         |

  Scenario: Invalid password is rejected
    When I log in with an invalid password from the fixture
    Then an invalid credentials message is displayed

  Scenario: Admin navigation displays the user management page
    Given I log in with the "admin" fixture credentials
    When I open the Admin menu
    Then the Admin user management page is displayed

  Scenario Outline: Create a user with an Admin role selection
    Given I log in with the "admin" fixture credentials
    When I open the Admin menu
    And I add a user with username prefix "<usernamePrefix>" and role "<role>"
    Then the created user is listed

    Examples:
      | usernamePrefix | role  |
      | cypressuser1   | ESS   |
      | cypressuser2   | Admin |
