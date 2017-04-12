/**
 *  Description: This will test P1 tests for the header
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */


import { browser } from 'protractor';
import { GlobalHeader } from "../../objects/pages/global/header";

describe('The global header from a P1 level', () => {

    let header: GlobalHeader;
    let fs = require('fs');

    beforeEach( () => {
        browser.get('/');
        header = new GlobalHeader();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/52 **/
    it('should be present', () => {
        expect(header.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/52 - Result #2 **/
    it('should have all expected elements', () => {
        expect(header.patients.isPresent()).toBe(true);
        expect(header.orders.link.isPresent()).toBe(true);
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
                expect(header.isPresent()).toBe(true);
            }
            ++pageCount;
        }

    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/69 **/
    it('should be 970 pixels wide', () => {

        let mediumWidth = 970;

        header.container.getSize().then(function(elementSize) {
            expect(elementSize.width).toBeLessThanOrEqual(mediumWidth);
        });
    });

});
