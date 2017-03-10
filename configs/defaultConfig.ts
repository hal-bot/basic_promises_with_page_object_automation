import {Config, browser} from 'protractor';

export let config: Config = {

    framework: 'jasmine',
    capabilities: {
      browserName: 'chrome'
      //browserName: 'internet explorer'
    },
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    specs: [
      '../specs/*.js'
    ],

    onPrepare: () => {
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
    },

    resultJsonOutputFile: 'report.json',

    noGlobals: true
};
