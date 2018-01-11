import {Config, browser} from 'protractor';

export let config: Config = {
    framework: 'jasmine',
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    baseUrl: "https://www.lego.com/",
    specs: ['./specs/**/*.js'],

    onPrepare: () => {
        return browser.get('/');        // Loads the site
    }
};

