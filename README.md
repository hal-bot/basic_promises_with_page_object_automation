Setup
=====

```
npm install
```

- Installs node modules
  - Protractor node module with TypeScript support
- Installs ambient typing dependencies.

Testing on Your Machine
=======================

In your terminal, run this in one tab...

```
webdriver-manager start 
```
... and in another tab type this:

```
npm run default-test
```
This will:
- Transpile TypeScript
- Run the test directly with ChromeDriver on your local machine

Testing with SauceLabs
=======================
In your terminal, type this:
                  
```
npm run saucelabs-test
```
This will:
- Transpile TypeScript
- Run the test in whatever has been specified in the "multiCapabilities" section of 'congifs > sauceConfig.ts'

For more information, go here: (TBA)