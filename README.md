Description
=====

This is code created to support the white paper, "Using Promises in Page Object Model Test Automation" 
(https://bit.ly/2JosnTE).  The purpose is to demonstrate how to use Promises with a test automation project that 
utilizes the Page Object Model.  The code found in this folder - 'example1' - will show examples of basic usage.  
Other folders (which are yet to be written) will expand on these examples to demonstrate more advanced examples.

To read the paper, go here: https://www.linkedin.com/pulse/using-promises-page-object-model-test-automation-hal-deranek

Setup
=====

```
npm install -g typescript
```
```
npm install
```

This installs TypeScript globally and then the npm packages

Testing on Your Machine
=======================

In your terminal, run this in one tab...

```
webdriver-manager start 
```
If this fails, try running 'webdriver-manager update', then try the 'start' command again


If you don't have webdriver-manager installed globally

```
./node_modules/.bin/webdriver-manager update
./node_modules/.bin/webdriver-manager start
```

In a second tab, type this:

```
tsc
```

This will transpile TypeScript

```
npm run test
```

This will run the test on your local machine
