# CodeceptJS BDD multi-platform configuration

## Summary

CodeceptJS opinionated setup with BDD tests for multiple platforms:

1. TypeScript
2. BDD (Gherkin)
3. Dockerfile and Docker Compose
4. CI (GitHub Actions)
5. Static code analysis: formatting and linting
6. Separate configuration and tests launch for:
   - Web _(via `Playwright`)_
   - Mobile _(via `WebDriver` + `Appium`)_:
     - BrowserStack device farm for remote `Appium` server
   - Backend
   - Infrastructure

## Setup

1. Clone repository with `git` and `cd` into cloned repo
2. Install development / system dependencies _(read below)_
3. Set environment variables _(read below)_
4. Launch:
   - With `Docker Compose`:
     - `docker-compose up` _(**TODO** - not finished at the moment)_
   - Without `Docker Compose`:
     - Switch to required `NodeJS` version:
       - `nvm install` _(if not installed)_
       - `nvm use`
     - Install packages: `npm install`
     - Run tests: `npm run test` _(or other commands - read below)_

## Development / System dependencies

| System dependency                                 | Minimum version | Description             |
| :------------------------------------------------ | :-------------- | :---------------------- |
| [Docker Compose](https://docs.docker.com/compose) | `2.x+`          | Container orchestration |
| [Docker Engine](https://docs.docker.com/engine)   | `20.x+`         | Container technology    |
| [Node.js](https://nodejs.org)                     | `20.x+`         | `JS` runtime            |
| [nvm](https://github.com/nvm-sh/nvm)              | `2.x+`          | Node Version Manager    |

### Mobile

Autotests can be launched locally or remotely via `Appium`

#### Local (mobile)

- Android requires installation of the following dependencies:

  | System dependency                                                                    | Minimum version | Description                                                       |
  | :----------------------------------------------------------------------------------- | :-------------- | :---------------------------------------------------------------- |
  | [Java](https://oracle.com/java/technologies/downloads)                               | `8+`            | Java runtime, `JDK` _(`openjdk` can be used)_                     |
  | [Android SDK Build Tools](https://developer.android.com/studio/releases/build-tools) | `24+`           | `Android SDK` _(recommended to be installed by `Android Studio`)_ |

  Additional info (Android):
  [driver setup](https://appium.io/docs/en/drivers/android-uiautomator2/index.html),
  [preparing app](https://appium.io/docs/en/writing-running-appium/running-tests/#preparing-your-app-for-test-android),
  [running tests](https://appium.io/docs/en/writing-running-appium/running-tests/#running-your-test-app-with-appium-android)

- iOS is not defined at the moment: **(TODO)**

  Additional info (iOS): [driver setup](https://appium.io/docs/en/drivers/ios-xcuitest/index.html),
  [preparing app](https://appium.io/docs/en/writing-running-appium/running-tests/#preparing-your-app-for-test-ios),
  [running tests](https://appium.io/docs/en/writing-running-appium/running-tests/#running-your-test-app-with-appium-ios)

#### Remote (mobile)

Does not require any additional system dependencies:

- BrowserStack:

  - App must be uploaded to `BrowserStack App Automate` cloud through
    [UI](https://app-automate.browserstack.com/dashboard) or
    [API](https://browserstack.com/docs/app-automate/api-reference/appium/apps#upload-an-app)
  - Environment variables related to `BrowserStack` must be set

- Other remote options: **(TODO)**

### Web

#### Local (web)

Launch via `Playwright` which is shipped with patched browser engines:

- Chromium (Chrome)
- Gecko (Firefox)
- WebKit (Safari)

Browser engines are being installed automatically. If needed, manual installation can be triggered
by `playwright:install-browsers` command.

Some functionality requires system dependencies (typically, for WebKit support). They can be
installed by `playwright:install-deps` command (works only for Debian/Ubuntu).
[More info](https://playwright.dev/docs/cli#install-system-dependencies)

#### Remote (web)

Not implemented at the moment: **(TODO)**

## Environment variables

### Basic

| ENV variable    | Required? | Default state | Example value | Description                                                              |
| :-------------- | :-------- | :------------ | :------------ | :----------------------------------------------------------------------- |
| `CI`            | -         | `false`       | `true`        | Defines whether running in CI or not                                     |
| `HEADLESS`      | -         | `false`       | `true`        | Headless launch for `CodeceptJS` (always headless when `CI=true`)        |
| `PAUSE_ON_FAIL` | -         | `false`       | `true`        | Pause `CodeceptJS` tests execution on fail (never pauses when `CI=true`) |

### API (backend)

| ENV variable                 | Required? | Default state                   | Example value                  | Description              |
| :--------------------------- | :-------- | :------------------------------ | :----------------------------- | :----------------------- |
| `TESTS_API_GRAPHQL_BASE_URL` | -         | `http://localhost:3000/graphql` | `https://test.example/graphql` | Base url for GraphQL API |
| `TESTS_API_REST_BASE_URL`    | -         | `http://localhost:3000/api`     | `https://test.example/api`     | Base url for REST API    |

### Mobile (common)

| ENV variable                        | Required? | Default state | Example value             | Description                      |
| :---------------------------------- | :-------- | :------------ | :------------------------ | :------------------------------- |
| `TESTS_MOBILE_COMMON_LAUNCH_TYPE`   | +         | -             | `local` or `remote`       | Determines autotests launch type |
| `TESTS_MOBILE_COMMON_USER_USERNAME` | +         | -             | `user@test.example`       | Username                         |
| `TESTS_MOBILE_COMMON_USER_PASSWORD` | +         | -             | `randomsequenceofsymbols` | Password                         |

### Mobile (local launch)

| ENV variable                      | Required? | Default state  | Example value           | Description                                                        |
| :-------------------------------- | :-------- | :------------- | :---------------------- | :----------------------------------------------------------------- |
| `TESTS_MOBILE_LOCAL_APP_PATH`     | +         | -              | `app-example-1.0.0.apk` | Path to app file (including filename)                              |
| `TESTS_MOBILE_LOCAL_PLATFORM`     | +         | -              | `Android` or `iOS`      | Platform (OS)                                                      |
| `TESTS_MOBILE_LOCAL_DEVICE`       | +         | -              | `Google Pixel 7`        | Device                                                             |
| `TESTS_MOBILE_LOCAL_CAPABILITIES` | -         | _Check config_ | -                       | [Read here](https://appium.io/docs/en/writing-running-appium/caps) |

### Mobile (remote launch via BrowserStack)

| ENV variable                             | Required? | Default state                | Example value                  | Description                                                     |
| :--------------------------------------- | :-------- | :--------------------------- | :----------------------------- | :-------------------------------------------------------------- |
| `TESTS_MOBILE_BROWSERSTACK_USERNAME`     | +         | -                            | `user_randomsequenceofsymbols` | BrowserStack API username                                       |
| `TESTS_MOBILE_BROWSERSTACK_ACCESS_KEY`   | +         | -                            | `randomsequenceofsymbols`      | BrowserStack API access key                                     |
| `TESTS_MOBILE_BROWSERSTACK_HOST`         | -         | `hub-cloud.browserstack.com` | `hub.test.example`             | BrowserStack Host                                               |
| `TESTS_MOBILE_BROWSERSTACK_PORT`         | -         | `4444`                       | `1337`                         | BrowserStack Port                                               |
| `TESTS_MOBILE_BROWSERSTACK_APP_URL`      | +         | -                            | `bs://randomsequenceofsymbols` | BrowserStack URL for uploaded app                               |
| `TESTS_MOBILE_BROWSERSTACK_PLATFORM`     | +         | -                            | `Android` or `iOS`             | BrowserStack platform (OS)                                      |
| `TESTS_MOBILE_BROWSERSTACK_DEVICE`       | +         | -                            | `Google Pixel 7`               | BrowserStack device                                             |
| `TESTS_MOBILE_BROWSERSTACK_CAPABILITIES` | -         | _Check config_               | -                              | [Read here](https://browserstack.com/app-automate/capabilities) |

### WEB (common)

| ENV variable               | Required? | Default state | Example value                       | Description                  |
| :------------------------- | :-------- | :------------ | :---------------------------------- | :--------------------------- |
| `TESTS_WEB_COMMON_BROWSER` | -         | `chromium`    | `chromium` or `webkit` or `firefox` | Browser for autotests launch |

### WEB (admin portal)

| ENV variable               | Required? | Default state           | Example value                | Description               |
| :------------------------- | :-------- | :---------------------- | :--------------------------- | :------------------------ |
| `TESTS_WEB_ADMIN_BASE_URL` | -         | `http://localhost:3000` | `https://admin.test.example` | Base URL for admin portal |
| `TESTS_WEB_ADMIN_USERNAME` | +         | -                       | `admin@test.example`         | Username                  |
| `TESTS_WEB_ADMIN_PASSWORD` | +         | -                       | `randomsequenceofsymbols`    | Password                  |

### WEB (user portal)

| ENV variable              | Required? | Default state           | Example value             | Description              |
| :------------------------ | :-------- | :---------------------- | :------------------------ | :----------------------- |
| `TESTS_WEB_USER_BASE_URL` | -         | `http://localhost:3000` | `https://test.example`    | Base URL for user portal |
| `TESTS_WEB_USER_USERNAME` | +         | -                       | `user@test.example`       | Username                 |
| `TESTS_WEB_USER_PASSWORD` | +         | -                       | `randomsequenceofsymbols` | Password                 |

## NPM script commands

### CodeceptJS commands

| Command                                                | Description                                                   |
| :----------------------------------------------------- | :------------------------------------------------------------ |
| `codecept:run`                                         | Run `CodeceptJS` test runner for all groups of tests          |
| `codecept:run:[api][infra][mobile][web]:[admin][user]` | Run `CodeceptJS` test runner for specific group of tests      |
| `codecept:types`                                       | Run `CodeceptJS` types generation for all groups of tests     |
| `codecept:types:[api][infra][mobile][web]`             | Run `CodeceptJS` types generation for specific group of tests |
| `codecept:ui:[api][infra][mobile][web]`                | Run `CodeceptJS` UI test runner for specific group of tests   |

### Build commands

Note: builds are not used at the moment

| Command      | Description                  |
| :----------- | :--------------------------- |
| `dist:build` | TS build                     |
| `dist:check` | Check TS build (`--noEmit`)  |
| `dist:clean` | Clean build folder (`dist/`) |

### Code style commands

| Command  | Description                                                           |
| :------- | :-------------------------------------------------------------------- |
| `format` | Check files formatting with `Trunk` (by default, only modified files) |
| `lint`   | Lint files with `Trunk` (by default, only modified files)             |

### Package commands

| Command          | Description                    |
| :--------------- | :----------------------------- |
| `package:update` | Update dependencies with `ncu` |

### Playground commands

| Command           | Description              |
| :---------------- | :----------------------- |
| `playground:main` | Run main playground file |

### Playwright commands

| Command                       | Description                                                           |
| :---------------------------- | :-------------------------------------------------------------------- |
| `playwright:codegen`          | Run `Playwright` in code generation graphical mode                    |
| `playwright:install-browsers` | Install browsers for `Playwright`                                     |
| `playwright:install-deps`     | Install system dependencies (Debian/Ubuntu) for `Playwright` browsers |

### Test commands

| Command                                        | Description                                                                     |
| :--------------------------------------------- | :------------------------------------------------------------------------------ |
| `test`                                         | Run `rm -rf reports/` and `codecept:types` and `codecept:run`                   |
| `test:[api][infra][mobile][web]:[admin][user]` | Run `rm -rf reports/[...]/` and `codecept:types:[...]` and `codecept:run:[...]` |

## Recommended software

| Software                                                       | Description                                                                                 |
| :------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| [Android Studio](https://developer.android.com/studio)         | IDE for Android which also manages Android SDK, emulated devices, etc.                      |
| [Appium Desktop](https://github.com/appium/appium-desktop)     | Appium Server in desktop GUIs for Mac, Windows, and Linux                                   |
| [Appium Inspector](https://github.com/appium/appium-inspector) | A GUI inspector for mobile apps and more, powered by a (separately installed) Appium Server |

## HOWTOs and quick tips

### Mobile local tests launch

0. Check local `Appium` environment with `Appium Doctor`
   ([verifying the installation](https://appium.io/docs/en/about-appium/getting-started/#verifying-the-installation))
1. Launch local `Appium` server:
   - Docker Compose - `docker-compose up` (note: **TODO** - not finished at the moment, works only
     for Android)
   - Standalone (GUI) - `Appium Desktop`
     ([download here](https://github.com/appium/appium-desktop/releases))
2. Launch a device emulator:
   - Android:
     - Docker Compose - `docker-compose up` (note: **TODO** - not finished at the moment)
     - Using`Android Studio`
   - iOS:
     - **TODO**
3. Set ENV variable `TESTS_MOBILE_COMMON_LAUNCH_TYPE` to `local`
4. Launch autotests: `npm run test:mobile`

### Mobile tests development

#### With local Appium server

0. Check local `Appium` environment with `Appium Doctor`
   ([verifying the installation](https://appium.io/docs/en/about-appium/getting-started/#verifying-the-installation))
1. Launch local `Appium` server:
   - Docker Compose - `docker-compose up` (note: **TODO** - not finished at the moment, works only
     for Android)
   - Standalone (GUI) - `Appium Desktop`
     ([download here](https://github.com/appium/appium-desktop/releases))
2. Launch a device emulator:
   - Android:
     - Docker Compose - `docker-compose up` (note: **TODO** - not finished at the moment)
     - Using`Android Studio`
   - iOS:
     - **TODO**
3. Launch `Appium Inspector` ([download here](https://github.com/appium/appium-inspector/releases))
4. Set "Remote Path" in `Appium Inspector` as `/wd/hub`
5. Set `desired capabilities` in `Appium Inspector`. Example:
   ```json
   {
     "platformName": "Android",
     "appium:platformVersion": "12",
     "appium:deviceName": "Google Pixel 7",
     "appium:automationName": "UiAutomator2",
     "appium:app": "app-example-1.0.0.apk",
     "appium:appPackage": "com.package.android.example"
   }
   ```
6. Press "Start Session" in `Appium Inspector`

#### With remote Appium server (BrowserStack)

1. Launch `Appium Inspector` ([download here](https://github.com/appium/appium-inspector/releases))
2. Select `Cloud Provider` and set credentials
3. Set `desired capabilities` in `Appium Inspector`. Example:
   ```json
   {
     "platformName": "Android",
     "appium:platformVersion": "12",
     "appium:deviceName": "Google Pixel 7",
     "appium:automationName": "UiAutomator2",
     "appium:app": "bs://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
     "appium:appPackage": "com.package.android.example"
   }
   ```
4. Press "Start Session" in `Appium Inspector`

### Tests step by step implementation and debugging

Use `pause()` function in tests ([read here](https://codecept.io/basics/#pause))

## TODOs

- Write tests for some example project
- Add code coverage reporting
- Add visual regression testing
- Add performance testing
- Add schema validation for API tests (`swagger-typescript-api`)
- Add `Appium` server via Docker ([reference](https://github.com/appium/appium-docker-android))
- Add emulated devices via Docker ([reference](https://github.com/budtmo/docker-android))
- Add parallel tests execution (`run-workers`, `run-multiple`)
- Complete `Dockerfile` and `Docker Compose` configs
- Make common configuration and merge platform-specific sub-configs
