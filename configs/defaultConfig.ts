//// Ref: https://github.com/angular/protractor/blob/master/lib/config.ts

import {Config, browser} from 'protractor';

export let config: Config = {

    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome'
        //browserName: 'internet explorer'
    },
    restartBrowserBetweenTests: false,                  //Note: setting this to TRUE will slow down test time significantly
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    specs: [
      '../specs/**/*.js'
    ],

    useAllAngular2AppRoots: true,

    // baseUrl: "https://dev.sttx40.com/",     // for testing on the dev environment
    baseUrl: "https://qc.sttx40.com/",        // for testing on the QC environment

    onPrepare: () => {
        // console.log("  PREPARING TESTS");
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
    },

    onComplete: () => {
        return browser.getProcessedConfig().then(function(config) {
            // console.log('  Finished tests for this capability: ' + config.capabilities);
        });
    },

    onCleanUp: (exitCode: number) => {
        if (exitCode === 0) {
            // console.log("ALL TESTS PASSED")
        } else {
            // console.log("HAD A FAILURE!!  'exitCode' = " + exitCode);
        }
    },

    resultJsonOutputFile: 'report.json',
    noGlobals: true

};
