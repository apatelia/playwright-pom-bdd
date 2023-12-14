## About

This repository contains a BDD test framework example using [Playwright](https://playwright.dev), [Cucumber](https://www.npmjs.com/package/@cucumber/cucumber) and Page Object Model pattern.

## Usage

1. Download the zip file or clone this repository.
2. Change the directory to `playwright-pom-bdd`.

```sh
cd playwright-pom-bdd
```

3. Install dependencies.

```sh
npm install
```

4. Run tests.

```sh
# run all the tests/features.
npm run test

# Run specific test(s) using specific tag(s).
# You can use Feature file level or test scenario level tags for fine control over execution.

# run all tests with @login tag.
npm run tag "@login"

# run all tests tagged with @cart_footer and @copyright, BOTH tags.
npm run tag "@cart_footer and @copyright"

# run all tests excepts the tests with @login tag.
npm run tag "not @login"
```

5. Generate a nice HTML report.

```sh
npm run report
```
