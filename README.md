# OrangeHRM Cypress E2E

Cypress end-to-end coverage for the OrangeHRM demo, implemented with Gherkin BDD scenarios and page objects.

## Requirements

- Node.js 18 or newer
- npm

## Run the tests

Install dependencies:

```sh
npm install
```

Open Cypress in GUI mode and select `admin-users.feature` to run the suite:

```sh
npx cypress open
```

Run headlessly:

```sh
npx cypress run
```

The equivalent npm scripts are `npm run test:e2e:open` and `npm run test:e2e`.

The scenarios use the demo account (`Admin` / `admin123`) stored in `cypress/fixtures/credentials.json`; do not use a real account there. The admin-creation scenarios generate unique usernames from the `cypressuser1` and `cypressuser2` prefixes to avoid conflicts with prior runs. One scenario uses an invalid fixture password to verify the login error state.

## Latest verification

- Headless: 5 scenarios passed with Cypress 14.5.4 and Electron 130.
- GUI: Cypress opened successfully; select the feature in the app to execute it interactively.

## Results and artifacts

- Mochawesome HTML report: `cypress/reports/index.html`
- Test evidence and failure screenshots: `cypress/screenshots/admin-users.feature/`

The suite captures evidence for the dashboard, invalid-login validation, Admin user management, and each created user. The HTML report and screenshots are included in the repository; rerunning the headless suite refreshes them. Test results are environment-dependent because the suite targets the live OrangeHRM demo site.

## Coverage

- Fixture-backed login and dashboard redirect validation
- Admin sidebar navigation and user-management page assertions
- User creation for ESS and Admin roles, followed by a user-list search
- Negative login validation for invalid credentials
