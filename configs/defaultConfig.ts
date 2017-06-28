//// Ref: https://github.com/angular/protractor/blob/master/lib/config.ts

import {Config, browser} from 'protractor';
import {LoginPage} from "../objects/pages/login";
import {TestRailWidget} from "../utils/class_testRailWidget";


let timeoutMS = 59000;

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
        '../specs/**/*.js'
    ],

    onPrepare: () => {
        console.log("  PREPARING TESTS");

        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
        browser.ignoreSynchronization = true;

        // Logs into the site
        return browser.get('/').then((thisPromise)=> {
            let loginPage = new LoginPage();
            return loginPage.initialize().then(()=> {
                return loginPage.login();
            }).then(()=> {
                return thisPromise;
            });
        });
    },

    onComplete: () => {
        return browser.getProcessedConfig().then((config)=> {
            // console.log('  Finished tests for this capability: ' + config.capabilities);
        });
    },

    resultJsonOutputFile: 'report.json',

    onCleanUp: (exitCode: number) => {
        if (exitCode === 0) {
            // console.log("ALL TESTS PASSED")
        } else {
            // console.log("HAD A FAILURE!!  'exitCode' = " + exitCode);
        }

        /** TODO: get the code below running w/ input from the command line.
         *        We don't want it running unless specifically asked for
         *        In the meantime, it will have to be uncommented when you want it to update TestRail
         **/

        // // The code in this Promise is meant to update TestRails
        // return new Promise<void>(async resolve => {
        //     console.log("\n\n\nAbout to update TestRails with data from this run");
        //
        //     let testRail = new TestRailWidget;
        //     await testRail.update();
        //
        //     console.log("\nTestRails has been updated");
        //     console.log("\n\n\n\n");
        //     return resolve();
        // });
    },

    noGlobals: true

};
