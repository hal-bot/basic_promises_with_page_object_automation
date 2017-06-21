//// Ref: https://github.com/angular/protractor/blob/master/lib/config.ts

import {Config, browser} from 'protractor';
import {LoginPage} from "../objects/pages/login";
import {resolve} from "url";

//  This will integrate the automated test cases into the Test Rail test cases
//  https://haemoslalom.testrail.net

let Testrail = require('testrail-api');

let timeoutMS = 59000;
declare let testRails;

export let config: Config = {

    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome'
        //browserName: 'internet explorer'
    },
    restartBrowserBetweenTests: false,                  //Note: setting this to TRUE will slow down test time significantly
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    allScriptsTimeout: timeoutMS,                  // how long Protractor will wait for Angular tasks to execute
    jasmineNodeOpts: {
        defaultTimeoutInterval: timeoutMS
    },

    useAllAngular2AppRoots: true,

    // baseUrl: "https://dev.sttx40.com/",     // for testing on the dev environment
    baseUrl: "https://qc.sttx40.com/",        // for testing on the QC environment

    /****
     *   Add tests in the 'specs' section
     ****/
    specs: [
        // '../specs/**/*.js'
        '../specs/**/*.js'
    ],

    onPrepare: () => {
        // console.log("  PREPARING TESTS");

        // browser.manage().window().maximize();
        // browser.manage().timeouts().implicitlyWait(5000);
        // browser.ignoreSynchronization = true;
        //
        // // Logs into the site
        // return browser.get('/').then((thisPromise)=> {
        //     let loginPage = new LoginPage();
        //     return loginPage.initialize().then(()=> {
        //         return loginPage.login();
        //     }).then(()=> {
        //         return thisPromise;
        //     });
        // });
    },

    onComplete: () => {
        return browser.getProcessedConfig().then((config)=> {
            // console.log('  Finished tests for this capability: ' + config.capabilities);
        });
    },

    onCleanUp: (exitCode: number) => {
        if (exitCode === 0) {
            // console.log("ALL TESTS PASSED")
        } else {
            // console.log("HAD A FAILURE!!  'exitCode' = " + exitCode);
        }
        // console.log("HERE 1");
        //
        // let testrail = new Testrail({
        //     host: 'https://haemoslalom.testrail.net',
        //     user: 'slalom.automated.tester@gmail.com',
        //     password: 'Password1234'
        // });
        //
        // console.log("HERE 2");
        //
        // return new Promise<void>(async (resolve) => {
        //     console.log("HERE 2.1");
        //     await testrail.getPlans(/*PROJECT_ID=*/1, /*FILTERS=*/{}, (err, plans)=> {
        //         console.log("HERE 3");
        //         console.log(plans);
        //     }, (err)=> {
        //         console.log('error', err);
        //     });
        //     return resolve();
        // });
    },

    resultJsonOutputFile: 'report.json',
    noGlobals: true

};
