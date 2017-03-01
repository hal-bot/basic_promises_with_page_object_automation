Using the automation framework

**Get Ready**
- Open a terminal
- Install Node v by typing `___ <put instructions here>`
- Navigate your terminal to the folder where you wish to put the code

**Get the code**
- Clone it from BitBucket (PUT LINK HERE)
- Type `cd <PUT FOLDER HERE>` 
- Run `npm install`
  - This will install Protractor _VERSION_, TypeScript _VERSION_, Cucumber _VERSION_, and other packages 

**Run the tests**

Assuming you're still in the folder where you ran the install...
- Type `npm run webdriver-start`
  - This will start Selenium
- Open a new tab in the terminal and navigate to the same folder
- Type `npm test`
  - This will compile the TypeScript changes and launch the tests

Note: Initial configuration inspiration came from to https://github.com/igniteram/protractor-cucumber-typescript