[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=id-fabrik_frontend-template&metric=alert_status&token=0201e05dcc9a754d5612c55115938ec34c408d1d)](https://sonarcloud.io/summary/new_code?id=id-fabrik_frontend-template)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=id-fabrik_frontend-template&metric=duplicated_lines_density&token=0201e05dcc9a754d5612c55115938ec34c408d1d)](https://sonarcloud.io/summary/new_code?id=id-fabrik_frontend-template)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=id-fabrik_frontend-template&metric=coverage&token=0201e05dcc9a754d5612c55115938ec34c408d1d)](https://sonarcloud.io/summary/new_code?id=id-fabrik_frontend-template)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=id-fabrik_frontend-template&metric=bugs&token=0201e05dcc9a754d5612c55115938ec34c408d1d)](https://sonarcloud.io/summary/new_code?id=id-fabrik_frontend-template)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=id-fabrik_frontend-template&metric=code_smells&token=0201e05dcc9a754d5612c55115938ec34c408d1d)](https://sonarcloud.io/summary/new_code?id=id-fabrik_frontend-template)
[![Integration](https://github.com/id-fabrik/frontend-template/actions/workflows/ci.yml/badge.svg)](https://github.com/id-fabrik/frontend-template/actions/workflows/ci.yml)

# Frontend Boilerplate OEV

## Stack:

- [pnpm](https://pnpm.io/)
- [Next JS](https://nextjs.org/docs)
- [Material UI](https://material-ui.com/) with [CSS Modules](https://mui.com/material-ui/guides/interoperability/#css-modules)
- Typescript
- Testing:
  - End-to-End:
    - [Playwright](https://playwright.dev/docs/intro) - End to end test runner
    - [Axe Playwright](https://playwright.dev/docs/accessibility-testing) - Accessibility testing in Playwright
  - Unit:
    - [Vitest](https://vitest.dev/) - Unit testing framework
    - [React Testing Library](https://testing-library.com/docs/react-testing-library) - Fundamental testing library for matchers and selectors.
    - [vitest-axe](https://github.com/chaance/vitest-axe) - Test components for accessibility.
- Hooks and formatters
  - [ESlint](https://eslint.org/docs/user-guide/getting-started) - Cleaning the code (js, jsx, ts, tsx)
  - [Stylelint](https://https://stylelint.io/) - Cleaning the style files (css, scss, sass)
  - [Prettier](https://prettier.io/) - Formatting the code (js, jsx, ts, tsx)
  - [Husky](https://typicode.github.io/husky/#/) - Git hooks
- Deployment tools
  - [Docker](https://docs.docker.com/get-docker/) - Build and run docker images
  - [docker-compose](https://docs.docker.com/compose/install/) - orchestrate docker images

---

## Running instructions

### Precondition

- <mark style="background-color: red;">NodeJS >= 14.0
- Docker
- docker-compose

### Installation

`pnpm install` OR `pnpm i`

### Application scripts

- `pnpm dev`: Start the application in development mode
- `pnpm build`: Build the application
- `pnpm start`: Start the application
- `docker-compose up`: Frontend will be build into a new image, backend will be pulled from registry, the command will start backend and frontend together

### Testing scripts

- `pnpm test`: Run all unit tests - headless
- `pnpm test-watch`: Run all unit tests in a watch mode
- `pnpm run test-e2e`: Run all E2E tests - headless
- `pnpm run test-e2e-watch`: Run all E2E tests in a watch mode

For testing in a specific engin (firefox, chromium, webkit(safari) ) add an BROWSER environment variable with the engine you would like to test with.

e.g. : `BROWSER=webkit pnpm ...`

---

## TDD Development Process

### Unit tests

<img src="./assets/vitest.svg" alt="drawing" width="50"/>

We use [Vitest](https://vitest.dev/) to write unit tests. The tests are located in `./tests/unit/__tests__/` and contain dedicated tests for each component and page.

We follow the [TDD approach](https://en.wikipedia.org/wiki/Test-driven_development) to write the tests. This means that the tests are considered to be written before the actual implementation of the feature. This ensures that the feature is implemented according to the requirements and that the tests are not written to fit the implementation.

Follow the following steps as a guide to write unit tests:

1. Before writing new components and pages, add a new test file in `tests/unit/__tests__/components/<Component>.test.tsx` or `tests/unit/__tests__/app/<page>/page.test.tsx`.
2. Create a basic `component` in `components/<Component>/`
3. Add the Unit tests with the following:
   1. UI Tests
   - basic rendering tests that verify the component is not crashing
   - tests that describe right behaviors, for example:
     - for input fields, set assertion of the output with the right input
     - for pages, set assertion of the output with the right rendered data
   - tests that describe wrong behavior, for example
     - for input fields, set assertion of the output with the errors
   2. Accessibility Tests
   - make assertions over the accessibility of the components, using [vitest-axe](https://github.com/chaance/vitest-axe).
4. Always use mocks, try to avoid external dependencies in the tests.
5. Write your component!

#### Unit Test Structure

Check out the [unit test example](./tests/unit/__tests__/components/Card.test.tsx) for a basic structure of a unit test.

#### Unit Test Scripts

All Tests

```sh
pnpm test
```

Debugging via watch mode

```sh
pnpm test-watch
```

### End-To-End tests

We use [Playwright](https://playwright.dev/docs/intro) for End to End (E2E) testing. The tests are located in `./tests/e2e/__tests__/` and contain dedicated scenarios for each page.

<img src="./assets/playwright.png" alt="drawing" width="50"/>

In general, writing e2e tests contributes to the [TDD approach](#unit-tests). The tests are considered to be written before the actual implementation of the feature. This ensures that the feature is implemented according to the requirements and that the tests are not written to fit the implementation.

In comparison to unit tests, E2E tests make assertions over the whole application, including interactions between different components and pages. They are used to test the application in real-world scenarios and to ensure that the application is working as expected.

E2E tests are also used to test the application in different browsers and devices. They should also ensure that connections to external services as the backend are working as expected.

#### E2E Test Structure

Check out the [e2e test example](./tests/e2e/__tests__/products.test.tsx) for a basic structure of an E2E test.

#### E2E Scripts

All Tests

```sh
pnpm test-e2e
```

Debugging via Playwright UI mode

```sh
pnpm test-e2e-watch
```

## Conventional Commits

Commit messages have to comply with the [Conventional Commits Summary](https://www.conventionalcommits.org/en/v1.0.0/#summary). This will be enforced by husky.
The commit message should be structured as follows:

```
 type commitType = build | chore | ci | docs | feat | fix | perf | refactor |revert | style | test

<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Linting

Linting is an essential process in maintaining high-quality code by automatically checking for syntactical, stylistic, and potential errors in the codebase. It helps enforce consistent coding standards, reduces the likelihood of bugs, and enhances code readability and maintainability. This project uses **ESLint** to analyze and ensure the quality of JavaScript and Typescript and identify problematic pattern and suggestions to fix them as well as **Stylelint** to avoid errors and consistent conventions in CSS and SCSS.

The [ESLint](https://github.com/oev-berlin/eslint-plugin-oev) and [Stylelint](https://github.com/oev-berlin/stylelint-plugin-oev) configurations are imported from an external repository to ensure the same rules in all projects.

To use this rules in existing projects, add both packages to your project:

```
pnpm add eslint-plugin-oev stylelint-plugin-oev
```

Afterwards add this to your .eslintrc.json file:

```
{
  "extends": [
    "plugin:oev/next"
  ]
}
```

And this to your .stylelintrc file:

```
{
  "extends": "stylelint-plugin-oev"
}
```

To run the linters:

```
pnpm lint
```

---

## Project structure

```
Project
    .husky\
        commit-msg              ................... Commit message hook script
        pre-commit              ................... Precommit hook script
    app\                      ................... Next JS app router
        <page>
            error.tsx               ................... Page error boundary
            page.tsx                ................... Page index page
            [_partials]\
                <partial-name>.tsx ................... Code for Components just used for this  specific route
                <partial-name>.module.css ................... The styles for the partial
                interfaces.ts ................... The type interfaces for the partial
        error.tsx               ................... Main error boundary
        interfaces.ts           ................... Main type interfaces
        layout.tsx              ................... Main layout
        page.tsx                ................... Main index page
    components\
        <component-name>\       ................... A folder for every component
            <component-name>.tsx ................... The component code
            <component-name>.module.css ................... The styles for the component
            interfaces.ts ................... The type interfaces for the component
    tests\
        unit\
            __mocks__\          ................... Mockups for the Unit tests
            __tests__\          ................... Unit tests
                components\
                    <component-name>.test.tsx .................. Unit tests for a component
                app\
                    <page-name>\
                        <page-name>.test.tsx .................. Unit tests for a page
        e2e\
            __tests__\          ................... E2E tests
                <page-name>.test.tsx .................. E2E tests for a page
    node_modules\
    public\                     ................... Public files
        favicon.ico
        vercel.svg
    .gitignore
    vitest.config.mts
    package.json
    ...
```

## Backend example with users

To run the backend with the frontend, you can use the following docker-compose file:

docker-compose.backend.yml

This includes the backend and frontend in one docker-compose file.
The example backend functions as a user service and provides functionality to create, read, update, and delete users.

## Design System

A design system with extended tokens (colors, spacing, radii, elevation), light/dark color schemes, and custom component variants has been added.

- Tokens: `config/styles.ts`
- Theme & color schemes: `config/theme.ts`
- Runtime mode switching: `CssVarsProvider` in `app/layout.tsx` and `ThemeModeToggle` component.
- Documentation: [docs/design-system.md](./docs/design-system.md)

Use the provided tokens instead of hardcoded values to ensure consistency and scalability.
