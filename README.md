State of automation
=====
The automation is currently broken.  Around June/July 2017, it was decided that deemphasizing automation over other needs was the
best course of action.  Unfortunately, that means very few measures have been taken to maintain the code.  Therefore, a good deal of updating
will be needed to get it working.  That being said, the following instructions will work once the code is up to snuff.

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


If you don't have webdriver-manager installed globally

```
./node_modules/.bin/webdriver-manager update
./node_modules/.bin/webdriver-manager start
```

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

_Note: the SauceLabs account is currently disabled. Once you establish a new account, you will need to update the code in 
SafeTraceTxAutomation / configs / sauceConfig.ts. You'll want to change the 'sauceUser' and 'sauceKey;_

Writing Tests
=======================
####Determining test content 
The automated tests should mirror the test cases in TestRail.  The difficulty is that sometimes a test case in TestRail will be compound
(more than one test in a test case).  In this case, you have two choices:
* Create a compound test in your automation
* Split the test case in TestRail into two or more tests (RECOMMENDED)

This might help you determine whether you should break up the TestRail test case or create a compound automated test case:
* BREAK IT UP: If the different part of the compound test case don't rely upon each other to progress.  I.E., if the first test fails but
the second, third, etc. tests could still be run without hindrance.
* COMPOUND: If the first test fails and therefore invalidates all subsequent tests

####Test titles
To ensure that the automated tests you write can be utilized for updating TestRail, you must include " - Case #" in the test's 
"it(_)" statement.  The reason for this is that the automation may use this test case number after the tests have completed to update the
test cases in TestRail for the current test run.

The number in "Case #" comes from the parent test case number.  This is the original test case, the one that is used
for each test run.  To put it another way, this is taken from the test case found in the "Test Cases" tabs in TestRail, not the 
"Test Runs & Results" tab.

The titles should also be descriptive of the action being taken.  It can mirror the title of the test case in TestRail if you like but it's
more important that it tell you something about the test.

Here's an example:
Looking at _specs > global > globalHeaderP1.ts_, we have this test: `"it('should be less than 1200 pixels wide - Case 69', () => {"`
That comes from this test case in TestRail - https://haemoslalom.testrail.net/index.php?/cases/view/69.  From this, we can see the following:
* The test case in TestRail is fairly simple, so no need to split it up
* The number of the test case is 69 (seen in the URL and also next to the title, "Lock page to Medium" - C69)
* The title of the automated test case is different from the title in TestRail.  The automation title emphasises the literal test as
"Medium" (from the TestRail test case) is a relative term


Integrating with TestRail
=======================
Part of what I wanted to achieve with this automation suite was not only to run smoke tests but also to assist with running regressions.
I figured the best way to achieve this was to allow the automation to work with TestRail and mark tests as either passed or failed. To
accomplish this, I created a class - utils/class_testRailWidget.ts - that would interact with TestRail' API to analyze the test cases
and update the appropriate ones.

Here's how it works...
1. All of the automated tests are run first.  The outcome of these tests is recorded in a JSON file - _report.json_
   * The report contains the following for each test:
      * A description of the test (from the test's "it(__)" line) 
      * Whether it passed (boolean)
      * Comments (if there was a failure)
      * How long it took for the test to run
1. The script logs into TestRail
1. It gets all of the test cases that have been marked as having been automated from TestRail
   * This is a custom field I created in TestRail - "Has this been automated?"  If the checkbox is checked, it will show up here
1. It parses the JSON file generated in the first step and filters out:
   * Any test that took 0ms to run
      * This indicates the test was skipped for some reason (probably it's "it" statement was make a "fit")
   * Any test that doesn't have " - Case " in the description    
      * As described in "Test titles" section above, this is necessary to determine the parent (root) test case
1. From that parsed JSON file, it examines each test and performs the following:
   * Finds the test case number from the test's "it(_)" statement and matches it to a test case in the retrieved tests from TestRail.  
   Here's how it does that:
      * Finds the most recent Milestone (expects there to only be one milestone that isn't completed and has been started)
      * Uses the found Milestone ID to find the current test plan ID (usually titled like "Sprint 20 Tests")
      * Uses the found Test Plan ID to get the FE test run ID
         * **Note: when this was written, only one test run was made for the FE.  This no longer applies and must be refactored**
      * Uses the found Run ID to get all the test cases associated with the run
      * Filters out any test cases that haven't been marked as having been automated
   * Sends the following to the API:
      * The test case ID
      * The status (passed/failed)
      * Comments (failure notes, if any, or that it passed)
      * The assignee (null if it passed, 1 - Hal Deranek - if failed))
      * The amount of time elapsed
      
This is all called in the _configs > defaultConfig.ts_ file's "afterLaunch" section.  Currently, it is commented out.
 Uncomment this section to enable it, but only when you are ready to let it run