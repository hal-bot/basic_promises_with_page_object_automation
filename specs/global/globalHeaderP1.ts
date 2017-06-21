/**
 *  Description: This will test P1 tests for the header
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */


import { GlobalHeader } from "../../objects/pages/global/header";
import {TestRailWidget} from "../../utils/class_testRailWidget";

//  This will integrate the automated test cases into the Test Rail test cases
//  https://haemoslalom.testrail.net

let Testrail = require('testrail-api');

fdescribe('The global header from a P1 level', () => {

    let header: GlobalHeader;
    let fs = require('fs');

    beforeAll( (done) => {
        // console.log("In 'beforeEach' for GlobalHeader");
        header = new GlobalHeader();
        return done();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/52 **/
    it('should be present', () => {
        console.log("The Global Header should be present");
        return expect<any>(header.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/52 - Result #2 **/
    it('should have all expected elements', () => {
        console.log("The Global Header should have all expected elements");
        return header.initialize().then(()=> {
            expect<any>(header.dashboard.isPresent()).toBe(true);
            return expect<any>(header.patients.isPresent()).toBe(true);
            // orders - not implemented
            // settings icon - not implemented
            // log out icon - not implemented
        });
    });

    // /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/52 - Result #1 **/
    // // TODO: Get this working for each page.
    // xit('should be on every page and not change', (done) => {
    //     console.log("The Global Header should be on every page and not change");
    //
    //     let pageLimiter = 0;        // limits the number of pages checked.  If 0, all pages will be checked
    //     let pageCount = 0;          // keeps track of how many pages we've tested
    //     let pages = fs.readFileSync('objects/pages/listOfPages.txt','utf8').split("\n");    // the pages we'll test against
    //
    //     for (let page of pages) {
    //         // console.log("\n  Testing page: " + page + ",  test #" + pageCount);
    //         if ((pageLimiter !== 0) && (pageCount >= pageLimiter)) {
    //             break;
    //         } else {
    //             browser.get(page).then(()=> {
    //                 return expect<any>(header.isPresent()).toBe(true);
    //             });
    //         }
    //         ++pageCount;
    //     }
    //
    //     return done();
    // });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/69 **/
    it('should be less than 1200 pixels wide', () => {
        console.log("The Global Header should be less than 1200 pixels wide");

        let largeWidth = 1200;

        return header.container.getSize().then((elementSize)=> {
            return expect(elementSize.width).toBeLessThan(largeWidth);
        });
    });

    xit('stuff', ()=> {
        let testRail = new TestRailWidget;

        return testRail.testPlans().then((plans)=> {
            // return console.log(plans);
        });

        // return done();
    });


    xit('stuff', (done)=> {
        console.log("FAKE TEST");

        console.log("HERE 1");

        let testrail = new Testrail({
            host: 'https://haemoslalom.testrail.net',
            user: 'slalom.automated.tester@gmail.com',
            password: 'Password1234'
        });

        console.log("HERE 2");

        return testrail.getPlans(/*PROJECT_ID=*/1, /*FILTERS=*/{'name': 'Sprint 10 Tests'}, (err, plans)=> {
            console.log("HERE 3");
            console.log(plans);
            return done();
        }, (err)=> {
            console.log('error', err);
            return done();
        });

        // return done();
    });

    fit('sdajf', ()=> {
        let url: string = 'https://haemoslalom.testrail.com/index.php?/api/v2/get_plans/1&milestone_id=9';

        console.log("HERE 1");
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic c2xhbG9tLmF1dG9tYXRlZC50ZXN0ZXJAZ21haWwuY29tOlBhc3N3b3JkMTIzNA=="
            },
            credentials: "same-origin"
        }).then((response)=> {
            console.log("HERE 2");
            // response.status,     //=> number 100–599
            // response.statusText, //=> String
            // response.headers    //=> Headers
            // response.url        //=> String

            console.log(response.text());

            return response.text();
        }, (error)=> {
            console.log("HERE 3");
            return error.message //=> String
        });
    });

});
