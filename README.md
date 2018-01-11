Description
=====

This is code created to support the white paper, "Using Promises in Page Object Test Automation".  The purpose is to 
demonstrate how to use Promises with a test automation project that utilizes the Page Object Design Pattern.  The code
found in this folder - 'example1' - will show examples of basic usage.  Other folders (which are yet to be written) will
expand on these examples to demonstrate more advanced examples.

To read the paper, go here: 

Setup
=====

```
npm install
```

This installs the npm packages

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
npm run test
```

This will:

- Transpile TypeScript
- Run the test on your local machine