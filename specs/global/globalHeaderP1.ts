/**
 *  Description: This will test P1 tests for the header
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */


import { browser } from 'protractor';
import { GlobalHeader } from "../../objects/pages/global/header";

xdescribe('The global header from a P1 level', () => {

    let header: GlobalHeader;
    let fs = require('fs');

    beforeEach( () => {
        header = new GlobalHeader();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/52 **/
    it('should be present', () => {
        expect<any>(header.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/52 - Result #2 **/
    it('should have all expected elements', () => {
        expect<any>(header.patients.isPresent()).toBe(true);
        expect<any>(header.orders.link.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/52 - Result #1 **/
    it('should be on every page and not change', () => {

        let pageLimiter = 0;        // limits the number of pages checked.  If 0, all pages will be checked
        let pageCount = 0;          // keeps track of how many pages we've tested
        let pages = fs.readFileSync('objects/pages/listOfPages.txt','utf8').split("\n");    // the pages we'll test against

        for (let page of pages) {
            // console.log("\n  Testing page: " + page + ",  test #" + pageCount);
            if ((pageLimiter !== 0) && (pageCount >= pageLimiter)) {
                break;
            } else {
                browser.get(page);
                expect<any>(header.isPresent()).toBe(true);
            }
            ++pageCount;
        }

    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/69 **/
    it('should be less than 1200 pixels wide', () => {

        let largeWidth = 1200;

        header.container.getSize().then(function(elementSize) {
            expect(elementSize.width).toBeLessThan(largeWidth);
        });
    });

});
