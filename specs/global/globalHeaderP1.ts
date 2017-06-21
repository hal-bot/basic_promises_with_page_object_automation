/**
 *  Description: This will test P1 tests for the header
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */


import { GlobalHeader } from "../../objects/pages/global/header";

describe('The global header from a P1 level', () => {

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

});
