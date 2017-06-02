Setup
=====

```
npm install
```

- This installs the npm packages

For IE testing, follow the instructions at this website: http://bit.ly/2mFDdMZ

Testing on Your Machine
=======================

In your terminal, run this in one tab...

```
webdriver-manager start 
```
If this fails, try running 'webdriver-manager update', then try the 'start' command again

In a second tab, type this:

```
npm run default-tests
```

This will:
- Transpile TypeScript
- Run the test directly with the browser specified in the "capabilities" section of 'configs > defaultConfig.ts' on your local machine
- Rerun test files where a test has failed

Testing with SauceLabs
=======================
In your terminal, type this:
                  
```
npm run saucelabs-tests
```
This will:
- Transpile TypeScript
- Run the test in whatever has been specified in the "multiCapabilities" section of 'configs > sauceConfig.ts'
- Rerun test files where a test has failed

For more information, see: https://haemoslalom.atlassian.net/wiki/pages/viewpage.action?pageId=5182205#

