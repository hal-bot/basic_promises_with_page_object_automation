import {browser,Config} from 'protractor';

export let config: Config = {

    /****
     *   Instructions for setting your environment variables: http://bit.ly/2mGAqnb
     ****/
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    /****
     *   Add tests in the 'specs' section
     ****/
    specs: [
        '../specs/*.js'
    ],

    onPrepare: function () {
        let caps = browser.getCapabilities();
    },

    /****
     *  - If you don't want to run all configs at once, comment sections out below
     *  - The 'iPad*-resolution-tests' are meant only to test that the site works at the resolution for that iPad
     *        It is not meant to be a test for an actual iPad.
     ****/
    multiCapabilities: [{
        name: "win10-chrome56-tests",
        browserName: 'chrome',
        version: '56',
        platform: 'Windows 10',
        shardTestFiles: true,
        maxInstances: 25
    // }, {
    //     name: "win7-chrome56-tests",
    //     browserName: 'chrome',
    //     version: '56',
    //     platform: 'Windows 7',
    //     shardTestFiles: true,
    //     maxInstances: 25
    // }, {
    //     name: "win10-ie11-tests",
    //     browserName: 'internet explorer',
    //     version: '11.0',
    //     platform: 'Windows 10',
    //     shardTestFiles: true,
    //     maxInstances: 25
    // }, {
    //     name: "win7-ie11-tests",
    //     browserName: 'internet explorer',
    //     version: '11.0',
    //     platform: 'Windows 7',
    //     shardTestFiles: true,
    //     maxInstances: 25
    // }, {
    //     name: "iPad2-resolution-tests",
    //     browserName: 'chrome',
    //     version: '56',
    //     platform: 'Windows 10',
    //     shardTestFiles: true,
    //     maxInstances: 25,
    //     screenResolution: '1024x768'
    // }, {
    //     name: "iPadAir2-resolution-tests",
    //     browserName: 'chrome',
    //     version: '56',
    //     platform: 'macOS 10.12',
    //     shardTestFiles: true,
    //     maxInstances: 25,
    //     screenResolution: '2048x1536'
    }],

    resultJsonOutputFile: 'report.json',

    onComplete: function () {
        let printSessionId = function (jobName) {
            browser.getSession().then(function (session) {
                console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
            });
        };
        printSessionId("Insert Job Name Here");
    }

};
