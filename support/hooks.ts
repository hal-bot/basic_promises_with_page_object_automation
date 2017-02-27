/*jslint node: true*/
import {browser} from 'protractor';
import * as fs from 'fs';
import {config} from '../config/config';

export = function () {

    let timeoutAmount: number = 10*1000;

    this.registerHandler('BeforeFeature',{timeout:timeoutAmount}, (event) => {
        if (config.baseUrl === undefined){
            throw "Haven't defined a baseurl.  Please do so in config.ts";
        }
        else {
            return browser.get(config.baseUrl);
        }
    });

    this.After((scenario, done) => {
        if (scenario.isFailed()) {
            return browser.takeScreenshot().then(function (base64png) {
                let decodedImage = new Buffer(base64png, 'base64').toString('binary');
                scenario.attach(decodedImage, 'image/png');
            }, (err) => {
                done(err);
            });
        } else {
            done();
        }
    });
}