/**
 *  Description: This will test P1 tests for the header
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */

import { GlobalHeader } from "../../objects/pages/global/header";
import {browser} from "protractor";

describe('The global header from a P1 level', () => {

    let header: GlobalHeader;
    let fs = require('fs');

    beforeAll( (done) => {
        // console.log("In 'beforeEach' for GlobalHeader");
        header = new GlobalHeader();
        return done();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/52 **/
    it('should be on every page and have all expected elements - Case 52', async (done) => {
        console.log("The Global Header should be on every page and have all expected elements");

        let pageLimiter = 0;        // limits the number of pages checked.  If 0, all pages will be checked
        let pageCount = 0;          // keeps track of how many pages we've tested
        let pages = await fs.readFileSync('objects/pages/listOfPages.txt','utf8').split("\n");    // the pages we'll test against

        for (let page of pages) {
            // console.log("\n  Testing page: " + page + ",  test #" + pageCount);
            if ((pageLimiter !== 0) && (pageCount >= pageLimiter)) {
                break;
            } else {
                await browser.get(page);
                await header.initialize();
                //TODO - get rid of this hacky 'sleep' and make sure the page has loaded first.  Have to move on for now
                await browser.sleep(1500);
                expect<any>(header.isPresent()).toBe(true);
                expect<any>(header.dashboard.isPresent()).toBe(true);
                expect<any>(header.patients.isPresent()).toBe(true);
                // expect<any>(header.logout.isPresent()).toBe(true);
            }
            ++pageCount;
        }

        return done();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/69 **/
    it('should be less than 1200 pixels wide - Case 69', () => {
        console.log("The Global Header should be less than 1200 pixels wide");

        let largeWidth = 1200;

        return header.container.getSize().then((elementSize)=> {
            return expect(elementSize.width).toBeLessThan(largeWidth);
        });
    });

});
